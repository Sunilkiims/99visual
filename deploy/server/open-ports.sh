#!/usr/bin/env bash
# Opens HTTP (80) and HTTPS (443) in the server's own firewall. Run as root.
#
# Oracle's Ubuntu images ship iptables rules that end in "REJECT everything except SSH", so the ports
# must be allowed BEFORE that rule. (They must also be opened in Oracle's network settings: the
# subnet's Security List / Network Security Group. See guide step 3.) The rules are saved so they
# survive reboots. Running this twice changes nothing.
set -euo pipefail

allow() {  # allow <iptables|ip6tables> <port>
  local ipt="$1" port="$2"
  command -v "$ipt" >/dev/null || return 0
  if "$ipt" -C INPUT -p tcp -m state --state NEW --dport "$port" -j ACCEPT 2>/dev/null; then
    return 0
  fi
  local reject
  reject="$("$ipt" -L INPUT --line-numbers -n | awk '$2 == "REJECT" { print $1; exit }')"
  if [ -n "$reject" ]; then
    "$ipt" -I INPUT "$reject" -p tcp -m state --state NEW --dport "$port" -j ACCEPT
  else
    "$ipt" -A INPUT -p tcp -m state --state NEW --dport "$port" -j ACCEPT
  fi
  echo "    $ipt: port $port allowed"
}

for port in 80 443; do
  allow iptables "$port"
  allow ip6tables "$port"
done

if command -v netfilter-persistent >/dev/null; then
  netfilter-persistent save >/dev/null 2>&1 && echo "    rules saved (kept after reboot)"
fi

# Some non-Oracle images use ufw instead; if it is switched on, open the ports there too.
if command -v ufw >/dev/null && ufw status 2>/dev/null | grep -q "Status: active"; then
  ufw allow 80/tcp >/dev/null && ufw allow 443/tcp >/dev/null && echo "    ufw: ports 80 and 443 allowed"
fi
