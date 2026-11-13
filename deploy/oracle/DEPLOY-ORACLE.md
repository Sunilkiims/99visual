# Move www.99visual.com from Vercel to Oracle Cloud (Always Free)

This moves the website and its database (Neon) onto one free Oracle Cloud Arm server. The site keeps
running on Vercel the whole time, so visitors see no gap; the switch happens when you change DNS, and
you can switch back in minutes if anything is wrong.

**What moves:** the Next.js site and its PostgreSQL data (insights posts, authors, SEO settings, leads,
newsletter subscribers, admin users).
**What stays as it is:** images on Cloudinary, email through Gmail and Resend, the OpenAI chat, Google
Analytics and Search Console, and your domain's email (MX) records.
**Cost:** ₹0 within Oracle's Always Free limits (2 Arm CPUs, 12 GB memory, 200 GB disk, 10 TB traffic a month).

Time needed: about 1½ hours, plus waiting for DNS. Steps 1–8 can be done any day without affecting
the live site; steps 9–11 are the switch-over.

---

## 1. Get ready (the day before)

1. **Lower the DNS "TTL"** of the `@` and `www` records for 99visual.com to **300 seconds (5 minutes)**,
   wherever your domain's DNS is managed (step 9 shows where to look). Then the switch, and any switch
   back, takes minutes instead of hours.
2. **Copy the site's settings from Vercel:** Vercel → project **99visual** → Settings → Environment
   Variables. Note the value of each one (click the eye icon), or with Node.js installed on your PC run
   `npx vercel env pull vercel-env.txt --environment=production` and open that file.
   Keep them private; you'll paste them into the server in step 6.
3. **Get Neon's direct connection string:** Neon console → your project → **Connect** → turn **off**
   "Connection pooling" → copy the string (`postgresql://…@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require`).
   It must be the address *without* `-pooler`. You'll use it in step 7.

## 2. Create the server

Oracle Cloud console → **Compute → Instances → Create instance**:

| Setting | Choose |
|---|---|
| Name | `web-1` (anything) |
| Image | **Canonical Ubuntu 24.04** (click *Change image*; the Arm/aarch64 build is picked automatically for the Ampere shape) |
| Shape | *Change shape* → **Ampere** → **VM.Standard.A1.Flex**, **2 OCPUs, 12 GB memory** |
| Networking | *Create new virtual cloud network* and *public subnet*; **Assign a public IPv4 address: Yes** |
| SSH keys | **Generate a key pair for me** → **Save private key** (a `.key` file; keep it safe, it's your only way in) |
| Boot volume | tick *Specify a custom boot volume size*: **100 GB** |

Click **Create**. If you see **"Out of capacity"**, try another *Availability domain* on the same page,
or try again later (Mumbai and Hyderabad are often busy for a few hours).

When it shows **Running**, note the **Public IP address**. Then make it permanent: instance → *Attached
VNICs* → the VNIC → *IPv4 Addresses* → ⋮ → *Edit* → **Reserved public IP** → create one. (An ephemeral
IP can change if the server is ever stopped; a reserved one never does.)

## 3. Open ports 80 and 443 in Oracle's network

Instance page → the **Subnet** link → **Security Lists** → *Default Security List* → **Add Ingress Rules**,
twice:

| Source CIDR | IP Protocol | Destination port |
|---|---|---|
| `0.0.0.0/0` | TCP | `80` |
| `0.0.0.0/0` | TCP | `443` |

(The server's own firewall is opened by the setup script in step 5. Both are needed.)

## 4. Protect the free server from being reclaimed (recommended)

Oracle may reclaim Always Free servers that look idle for a week (CPU, network and memory all under 20%).
A business website with modest traffic can look idle. To avoid losing it:

- **Upgrade to Pay As You Go:** console → *Billing & Cost Management* → *Upgrade and Manage Payment*.
  Always Free resources stay free after upgrading; you only pay for anything beyond the free limits.
- Then **set a budget alert** (*Billing → Budgets → Create budget*, e.g. ₹100/month) so any accidental
  paid resource is noticed immediately.
- Either way, keep the off-server backups in step 13.

## 5. Connect and set up the server

On Windows, open **PowerShell** (Start → type *PowerShell*):

```powershell
ssh -i "C:\Users\YOU\Downloads\ssh-key-2026-11-13.key" ubuntu@SERVER_IP
```

(Type `yes` the first time.) If it says the key's permissions are too open, run this once and retry:

```powershell
icacls "C:\Users\YOU\Downloads\ssh-key-2026-11-13.key" /inheritance:r /grant:r "$($env:USERNAME):R"
```

Now on the server:

```bash
sudo -i
git clone https://github.com/Sunilkiims/99visual.git /root/99visual-setup
EMAIL=you@example.com bash /root/99visual-setup/deploy/oracle/setup-server.sh
```

Use your real email (Let's Encrypt sends certificate notices there). The script takes about 10 minutes
and installs everything: PostgreSQL 17, Node.js 22, nginx, pm2, the firewall rules, automatic security
updates and the nightly backup. It creates:

- the app user `visual99` and the project in `/var/www/99visual`,
- a local database `visual99` with a random password (in `/etc/99visual/db-password`),
- `/var/www/99visual/.env` with the database address already filled in.

It's safe to run again if anything stops halfway.

## 6. Fill in the settings

```bash
nano /var/www/99visual/.env
```

Fill in each empty value with the one from Vercel (step 1.2): `EMAIL_USER`, `EMAIL_PASS`, `LEAD_EMAIL`,
`APPLY_TO_EMAIL`, `RESEND_API_KEY`, `RESEND_FROM`, `CLOUDINARY_*`, `OPENAI_API_KEY`, `CAPTCHA_SECRET`,
`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`.
**Do not copy Vercel's `DATABASE_URL`**: the one already in the file points to the new local database.
`JWT_SECRET` is pre-filled with a new value (you may paste Vercel's instead; a new one just means admins
sign in again). Keep `APP_ENV=production`; it switches on Google Analytics and IndexNow for the live site.

Save with **Ctrl+O, Enter**, exit with **Ctrl+X**.

## 7. Copy the data from Neon

```bash
NEON_URL='postgresql://…paste the direct Neon string from step 1.3…' bash /var/www/99visual/deploy/oracle/copy-from-neon.sh
```

Neon is only read, so the live site is unaffected. At the end it prints a table of row counts for Neon
and for the server, which should match. You'll run this once more right before the switch (step 9).

## 8. Build and start

```bash
sudo -iu visual99 bash /var/www/99visual/deploy/oracle/deploy.sh
```

About 5 minutes. It installs packages, applies database migrations, builds, and starts the site with
pm2 (which restarts it after crashes and reboots). It ends with **"Done: the site answers on port 3100."**

**Try it before switching:** open `http://SERVER_IP` in your browser; the home page should load.
To test everything over HTTPS (forms, admin login, image upload) on the new server first:

1. At your DNS provider add an **A record**: name `test`, value `SERVER_IP`.
2. A few minutes later, on the server: `certbot --nginx -d test.99visual.com -m you@example.com --agree-tos --redirect`
3. Open **https://test.99visual.com**. (It is marked noindex, so search engines ignore it; links in
   emails and the sitemap still point to www, which is still Vercel at this point.)

## 9. Switch the domain to the new server

1. **Copy the latest data once more** (anything submitted since step 7):
   ```bash
   NEON_URL='postgresql://…' bash /var/www/99visual/deploy/oracle/copy-from-neon.sh
   ```
2. **Change DNS.** Find where DNS is managed: it's wherever you lowered the TTL in step 1. If unsure, look
   up *99visual.com* on <https://lookup.icann.org>; the "Name servers" show it (`*.ns.cloudflare.com` =
   Cloudflare, `*.domaincontrol.com` = GoDaddy, `*.dns-parking.com` = Hostinger).

   | Record | Before (Vercel) | After |
   |---|---|---|
   | `@` (99visual.com) | A `76.76.21.21` (or similar) | **A `SERVER_IP`** |
   | `www` | CNAME `cname.vercel-dns.com` (or an A record) | **delete the CNAME, add A `SERVER_IP`** |

   - Delete any other `A` or `AAAA` records for `@` or `www` that point to Vercel.
   - **Do not touch** `MX`, `TXT` (SPF/DKIM/Google verification), or records for other names such as
     `wa` (your WhatsApp app tunnel).
   - **Cloudflare only:** set both records to **DNS only** (grey cloud). You can turn the orange cloud
     back on after step 10 if you want Cloudflare's CDN, with SSL mode **Full (strict)**.
3. **Wait** until it points to the server. In PowerShell:
   ```powershell
   nslookup www.99visual.com 8.8.8.8
   nslookup 99visual.com 8.8.8.8
   ```
   Both must show `SERVER_IP` (usually 5–30 minutes with the low TTL).

## 10. Turn on HTTPS

On the server:

```bash
certbot --nginx -d 99visual.com -d www.99visual.com -m you@example.com --agree-tos --redirect
```

If you made the test address in step 8, include it so one certificate covers all three names:

```bash
certbot --nginx --expand -d test.99visual.com -d 99visual.com -d www.99visual.com -m you@example.com --agree-tos --redirect
```

(Then keep the `test` DNS record pointing to the server: the automatic renewal checks every name on
the certificate.) Certificates renew automatically every 60–90 days. Open **https://www.99visual.com** and check:

- [ ] Home, services, work, insights and a few articles load, with images
- [ ] `https://99visual.com/about` redirects to `https://www.99visual.com/about`
- [ ] The contact form sends you the lead email
- [ ] Newsletter sign-up sends the 6-digit code, and confirming works
- [ ] Careers application with a CV arrives
- [ ] The chat assistant answers
- [ ] Admin login works; you can edit a post and upload an image
- [ ] Google Analytics *Realtime* shows your visit (after accepting analytics cookies)
- [ ] `https://www.99visual.com/sitemap.xml` and `/robots.txt` load

## 11. After the switch

- **Keep the Vercel project for a week** without changing it. If something goes wrong, point the DNS
  records back to Vercel's values (step 9 table) and it's live there again within minutes.
- **Leads during the switch:** for a few minutes some visitors may still have reached Vercel, which writes
  to Neon. Those leads were also emailed to you. To check, a day later compare Neon (Neon console →
  SQL Editor) with the server:
  ```bash
  sudo -u postgres psql visual99 -c "SELECT count(*) FROM contact_leads; SELECT count(*) FROM newsletter_subscribers;"
  ```
- **After a week:** Vercel → project → Settings → **Domains** → remove 99visual.com and www.99visual.com
  (this stops Vercel serving it). Keep the Neon database a little longer as an extra backup, then pause or
  delete it.
- Search Console needs nothing: the address is the same, and the site still tells Google to index only
  `www.99visual.com`.

## 12. Publishing changes from now on

Vercel deployed automatically on every push; on the server you deploy with one command:

1. Push your changes to GitHub (`main`) as usual.
2. Connect (step 5) and run:
   ```bash
   sudo -iu visual99 bash /var/www/99visual/deploy/oracle/deploy.sh
   ```

It pulls the latest code, applies any new Prisma migrations, rebuilds and restarts without downtime. If
you change `.env` (for example a new API key), run it too.

## 13. Backups

- Every night at 03:30 (server time) the database is backed up to `/var/backups/99visual` (14 days kept).
  The newest copy is also placed in the `ubuntu` user's home folder for downloading.
- **Download a copy to your PC every week** (a backup on the server is lost if the server is):
  ```powershell
  scp -i "C:\Users\YOU\Downloads\ssh-key-2026-11-13.key" ubuntu@SERVER_IP:99visual-latest.dump .
  ```
- Also enable Oracle's boot volume backups (instance → Boot volume → *Backup policies* → *Bronze*);
  up to 5 volume backups are free.
- **Restore** a backup (replaces the current data):
  ```bash
  sudo -iu visual99 pm2 stop 99visual
  sudo -u postgres pg_restore --clean --if-exists --no-owner --role=visual99 -d visual99 < /var/backups/99visual/latest.dump
  sudo -iu visual99 pm2 start 99visual
  ```

## Troubleshooting

| Problem | What to do |
|---|---|
| Browser can't reach `http://SERVER_IP` | Check the ingress rules (step 3). On the server: `sudo bash /var/www/99visual/deploy/oracle/open-ports.sh` |
| `502 Bad Gateway` | The app isn't running: `sudo -iu visual99 pm2 logs 99visual --lines 50` |
| Build stopped / out of memory | Run `deploy.sh` again; check `free -h` (the setup adds 2 GB swap) |
| `copy-from-neon.sh` says Neon is newer | Install that version: `apt-get install -y postgresql-client-18` (use the number shown), run again |
| `copy-from-neon.sh` can't connect | Use the **direct** Neon string (no `-pooler`), with `?sslmode=require`; make sure the Neon project isn't suspended |
| certbot fails | Both `99visual.com` and `www` must already point to `SERVER_IP` (`nslookup`), and Cloudflare must be grey-cloud |
| Emails not sending | Check `EMAIL_USER` / `EMAIL_PASS` (a Gmail *app password*) in `.env`, then run `deploy.sh` |
| Server unreachable after a few weeks | It may have been reclaimed as idle (step 4). Recreate it and restore your latest backup |
| Logs | App: `sudo -iu visual99 pm2 logs 99visual` · nginx: `tail /var/log/nginx/error.log` · backups: `tail /var/log/99visual-backup.log` |

## What the setup secures

- Login only with your SSH key (Oracle disables passwords); `fail2ban` blocks repeated SSH guesses.
- Only SSH (22), HTTP (80) and HTTPS (443) are open. PostgreSQL listens on the server only.
- Security updates install automatically every day.
- The app runs as its own unprivileged user; `.env` and backups are readable only by their owners.
- nginx overwrites the visitor address header, so it can't be faked.

## Adding Shilpikala later

The server is ready to host more sites: 99visual uses port 3100, so Shilpikala can use its usual 3000
with its own nginx site, database and user next to it. Ask for the Oracle version of Shilpikala's scripts
when you're ready.
