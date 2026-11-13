#!/usr/bin/env bash
# Creates the Always Free server for www.99visual.com from Oracle Cloud Shell (OCI CLI is already signed in):
# a network with a public subnet, firewall rules for SSH/HTTP/HTTPS, and an Ampere A1 instance
# (2 OCPUs, 12 GB, Ubuntu 24.04, 100 GB disk) with a reserved public IP.
#
#   bash create-server-oci.sh
#
# Everything stays inside the Always Free limits. Running it again reuses what already exists.
set -euo pipefail

C="${COMPARTMENT_ID:-${OCI_TENANCY:?Run this in Oracle Cloud Shell (OCI_TENANCY is not set)}}"
NAME="${NAME:-web-1}"
KEY="$HOME/.ssh/oci_${NAME}"
SHAPE=VM.Standard.A1.Flex
OCPUS="${OCPUS:-2}"
MEMORY_GB="${MEMORY_GB:-12}"
BOOT_GB="${BOOT_GB:-100}"
q() { oci "$@" 2>/dev/null; }

echo "==> SSH key ($KEY)"
if [ ! -f "$KEY" ]; then
  mkdir -p "$HOME/.ssh" && chmod 700 "$HOME/.ssh"
  ssh-keygen -q -t rsa -b 4096 -N "" -C "$NAME" -f "$KEY"
fi

echo "==> Network"
VCN="$(q network vcn list -c "$C" --display-name web-vcn --lifecycle-state AVAILABLE --query 'data[0].id' --raw-output || true)"
if [ -z "$VCN" ] || [ "$VCN" = "null" ]; then
  VCN="$(oci network vcn create -c "$C" --display-name web-vcn --cidr-blocks '["10.0.0.0/16"]' --dns-label webvcn \
    --wait-for-state AVAILABLE --query 'data.id' --raw-output)"
fi
IGW="$(q network internet-gateway list -c "$C" --vcn-id "$VCN" --query 'data[0].id' --raw-output || true)"
if [ -z "$IGW" ] || [ "$IGW" = "null" ]; then
  IGW="$(oci network internet-gateway create -c "$C" --vcn-id "$VCN" --display-name web-igw --is-enabled true \
    --wait-for-state AVAILABLE --query 'data.id' --raw-output)"
fi
RT="$(oci network vcn get --vcn-id "$VCN" --query 'data."default-route-table-id"' --raw-output)"
oci network route-table update --rt-id "$RT" --force \
  --route-rules "[{\"destination\":\"0.0.0.0/0\",\"destinationType\":\"CIDR_BLOCK\",\"networkEntityId\":\"$IGW\"}]" >/dev/null
SL="$(oci network vcn get --vcn-id "$VCN" --query 'data."default-security-list-id"' --raw-output)"
oci network security-list update --security-list-id "$SL" --force --ingress-security-rules '[
  {"source":"0.0.0.0/0","protocol":"6","tcpOptions":{"destinationPortRange":{"min":22,"max":22}},"description":"SSH"},
  {"source":"0.0.0.0/0","protocol":"6","tcpOptions":{"destinationPortRange":{"min":80,"max":80}},"description":"HTTP"},
  {"source":"0.0.0.0/0","protocol":"6","tcpOptions":{"destinationPortRange":{"min":443,"max":443}},"description":"HTTPS"},
  {"source":"0.0.0.0/0","protocol":"1","icmpOptions":{"type":3,"code":4}},
  {"source":"10.0.0.0/16","protocol":"1","icmpOptions":{"type":3}}
]' >/dev/null
SUBNET="$(q network subnet list -c "$C" --vcn-id "$VCN" --display-name web-public --query 'data[0].id' --raw-output || true)"
if [ -z "$SUBNET" ] || [ "$SUBNET" = "null" ]; then
  SUBNET="$(oci network subnet create -c "$C" --vcn-id "$VCN" --display-name web-public --cidr-block 10.0.0.0/24 \
    --dns-label web --route-table-id "$RT" --security-list-ids "[\"$SL\"]" \
    --wait-for-state AVAILABLE --query 'data.id' --raw-output)"
fi
echo "    network ready (ports 22, 80, 443 open)"

echo "==> Server"
INSTANCE="$(q compute instance list -c "$C" --display-name "$NAME" --query "data[?\"lifecycle-state\"!='TERMINATED'] | [0].id" --raw-output || true)"
if [ -z "$INSTANCE" ] || [ "$INSTANCE" = "null" ]; then
  IMAGE="$(oci compute image list -c "$C" --operating-system "Canonical Ubuntu" --operating-system-version "24.04" \
    --shape "$SHAPE" --sort-by TIMECREATED --sort-order DESC --query 'data[0].id' --raw-output)"
  echo "    image: $(oci compute image get --image-id "$IMAGE" --query 'data."display-name"' --raw-output)"
  ADS="$(oci iam availability-domain list -c "$C" --query 'data[].name' --raw-output | tr -d '[]",')"
  ATTEMPTS="${ATTEMPTS:-30}"        # free Arm capacity comes and goes: keep trying for a while
  SIZES="${OCPUS}:${MEMORY_GB}"
  [ "${FALLBACK:-1}" = "1" ] && [ "$OCPUS" != "1" ] && SIZES="$SIZES 1:6"   # a smaller size is often available sooner
  for attempt in $(seq 1 "$ATTEMPTS"); do
    for size in $SIZES; do
      for AD in $ADS; do
        o="${size%%:*}"; m="${size##*:}"
        echo "    [$attempt/$ATTEMPTS] $(date +%H:%M:%S) trying $o OCPU / $m GB in ${AD##*:} ..."
        if OUT="$(oci compute instance launch -c "$C" --availability-domain "$AD" --display-name "$NAME" \
             --shape "$SHAPE" --shape-config "{\"ocpus\":$o,\"memoryInGBs\":$m}" \
             --image-id "$IMAGE" --subnet-id "$SUBNET" --assign-public-ip true --boot-volume-size-in-gbs "$BOOT_GB" \
             --ssh-authorized-keys-file "$KEY.pub" --wait-for-state RUNNING --query 'data.id' --raw-output 2>&1)"; then
          INSTANCE="$(echo "$OUT" | grep -o 'ocid1.instance[^" ]*' | head -1)"
          break 3
        fi
        if echo "$OUT" | grep -qiE 'capacity|TooManyRequests|"status": (429|500|503)|InternalError'; then
          echo "      not available right now"
          sleep 20
        else
          echo "$OUT" | tail -8
          exit 1
        fi
      done
    done
    [ "$attempt" -lt "$ATTEMPTS" ] && sleep "${WAIT_SECONDS:-60}"
  done
  if [ -z "$INSTANCE" ]; then
    echo "Oracle has had no free Arm capacity in this region during these attempts. Run this script again later."
    exit 2
  fi
fi
echo "    $NAME is running"

echo "==> Public IP (reserved, so it never changes)"
VNIC="$(oci compute instance list-vnics --instance-id "$INSTANCE" --query 'data[0].id' --raw-output)"
PRIVATE_IP="$(oci network private-ip list --vnic-id "$VNIC" --query 'data[0].id' --raw-output)"
CURRENT="$(q network public-ip get --private-ip-id "$PRIVATE_IP" --query 'data.{id:id,ip:"ip-address",life:lifetime}' || true)"
LIFE="$(echo "$CURRENT" | grep -o '"life": "[A-Z]*"' | cut -d'"' -f4 || true)"
if [ "$LIFE" != "RESERVED" ]; then
  if RES="$(oci network public-ip create -c "$C" --lifetime RESERVED --display-name "$NAME-ip" --query 'data.id' --raw-output 2>&1)"; then
    OLD="$(echo "$CURRENT" | grep -o '"id": "[^"]*"' | cut -d'"' -f4 || true)"
    [ -n "$OLD" ] && oci network public-ip delete --public-ip-id "$OLD" --force >/dev/null
    oci network public-ip update --public-ip-id "$RES" --private-ip-id "$PRIVATE_IP" >/dev/null
    sleep 5
  else
    echo "    could not reserve an IP ($RES); keeping the current one"
  fi
fi
IP="$(oci network public-ip get --private-ip-id "$PRIVATE_IP" --query 'data."ip-address"' --raw-output)"

cat <<DONE

Server ready: $NAME  $IP
Connect from Cloud Shell:   ssh -i $KEY ubuntu@$IP
(The private key is in Cloud Shell at $KEY. Download it with Actions → Download if you want to connect from your PC.)
DONE
echo "$IP" > "$HOME/${NAME}.ip"
