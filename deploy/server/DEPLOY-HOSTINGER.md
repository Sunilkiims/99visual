# Move www.99visual.com from Vercel to a Hostinger VPS (KVM 2)

This moves the website and its database (Neon) onto your own Hostinger VPS. The site keeps running on
Vercel the whole time, so visitors see no gap; the switch happens when you change DNS, and you can
switch back in minutes if anything is wrong.

**What moves:** the Next.js site and its PostgreSQL data (insights posts, authors, SEO settings, leads,
newsletter subscribers, admin users).
**What stays as it is:** images on Cloudinary, email through Gmail and Resend, the OpenAI chat, Google
Analytics and Search Console, your domain's email (MX) records, and the WhatsApp app on your PC.
**Room to grow:** KVM 2 (2 vCPU, 8 GB, 100 GB) comfortably runs 99visual and Shilpikala side by side.
99visual uses port 3100, leaving 3000 for Shilpikala.

Time needed: about an hour, plus waiting for DNS. Steps 1–7 can be done any day without affecting the
live site; steps 8–10 are the switch-over.

---

## 1. Get ready (the day before)

1. **Lower the DNS "TTL"** of the `@` and `www` records for 99visual.com to **300 seconds (5 minutes)**,
   wherever your domain's DNS is managed (step 8 shows how to find out). The switch, and any switch
   back, then takes minutes instead of hours.
2. **Copy the site's settings from Vercel:** Vercel → project **99visual** → Settings → Environment
   Variables (click the eye icon on each), or with Node.js on your PC:
   `npx vercel env pull vercel-env.txt --environment=production`. Keep them private.
3. **Get Neon's direct connection string:** Neon console → your project → **Connect** → turn **off**
   "Connection pooling" → copy it (`postgresql://…@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require`).
   It must be the address *without* `-pooler`.

## 2. Buy and set up the VPS in Hostinger

1. Buy **VPS → KVM 2**.
2. In the setup wizard:
   - **Location:** India (Mumbai) if offered, otherwise the nearest one in Asia.
   - **Operating system:** **Plain OS → Ubuntu 24.04** (not a control panel or an app template).
   - **Root password:** a long, unique one; keep it in your password manager. (Adding your SSH key here
     too is even better.)
3. When it shows **Running**, note the **IPv4 address** on the VPS overview page (`SERVER_IP` below).
4. hPanel → VPS → **Security → Firewall**: if a firewall is configured there, make sure it allows
   TCP **22**, **80** and **443**. (By default there is none; the server's own firewall is set up in step 4.)

## 3. Connect to the server

Either:
- hPanel → VPS → **Browser terminal** (opens a terminal already signed in as root), or
- Windows **PowerShell**: `ssh root@SERVER_IP` (type `yes` the first time, then the root password).

## 4. Set up the server

```bash
git clone https://github.com/Sunilkiims/99visual.git /root/99visual-setup
bash /root/99visual-setup/deploy/server/setup-server.sh
```

About 10 minutes. It installs and configures everything: PostgreSQL 17, Node.js 22, nginx, pm2, the
firewall (only SSH, HTTP and HTTPS open), fail2ban, automatic security updates, and a nightly backup.
It creates:

- the app user `visual99` and the project in `/var/www/99visual`,
- a local database `visual99` with a random password (in `/etc/99visual/db-password`),
- `/var/www/99visual/.env` with the database address already filled in.

It's safe to run again if anything stops halfway. (HTTPS is added in step 9, after DNS points here.)

## 5. Fill in the settings

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

## 6. Copy the data from Neon

```bash
NEON_URL='postgresql://…paste the direct Neon string from step 1.3…' bash /var/www/99visual/deploy/server/copy-from-neon.sh
```

Neon is only read, so the live site is unaffected. It ends with a table of row counts for Neon and for
the server, which should match. You'll run it once more right before the switch (step 8).

## 7. Build, start and try it

```bash
sudo -iu visual99 bash /var/www/99visual/deploy/server/deploy.sh
```

About 5 minutes. It installs packages, applies database migrations, builds, and starts the site with
pm2 (which restarts it after crashes and reboots). It ends with **"Done: the site answers on port 3100."**

**Try it before switching:** open `http://SERVER_IP` in your browser; the home page should load.
To test everything over HTTPS first (forms, admin login, image upload):

1. At your DNS provider add an **A record**: name `test`, value `SERVER_IP`.
2. A few minutes later, on the server: `certbot --nginx -d test.99visual.com -m you@example.com --agree-tos --redirect`
3. Open **https://test.99visual.com**. (It's marked noindex, so search engines ignore it.)

## 8. Switch the domain to the VPS

1. **Copy the latest data once more** (anything submitted since step 6):
   ```bash
   NEON_URL='postgresql://…' bash /var/www/99visual/deploy/server/copy-from-neon.sh
   ```
2. **Change DNS.** If you're not sure where it's managed, look up *99visual.com* on
   <https://lookup.icann.org>; the "Name servers" show it (`*.ns.cloudflare.com` = Cloudflare,
   `*.domaincontrol.com` = GoDaddy, `*.dns-parking.com` = Hostinger hPanel → Domains → DNS / Nameservers).

   | Record | Before (Vercel) | After |
   |---|---|---|
   | `@` (99visual.com) | A `76.76.21.21` (or similar) | **A `SERVER_IP`** |
   | `www` | CNAME `cname.vercel-dns.com` (or an A record) | **delete the CNAME, add A `SERVER_IP`** |

   - Delete any other `A` or `AAAA` records for `@` or `www` that point to Vercel.
   - **Do not touch** `MX`, `TXT` (SPF/DKIM/Google verification), or other names such as `wa`
     (your WhatsApp app's Cloudflare tunnel).
   - **Cloudflare only:** set both records to **DNS only** (grey cloud) until HTTPS is working.
3. **Wait** until both point to the VPS (usually 5–30 minutes with the low TTL). In PowerShell:
   ```powershell
   nslookup www.99visual.com 8.8.8.8
   nslookup 99visual.com 8.8.8.8
   ```

## 9. Turn on HTTPS

On the server:

```bash
certbot --nginx -d 99visual.com -d www.99visual.com -m you@example.com --agree-tos --redirect
```

If you made the test address in step 7, use this instead so one certificate covers all three names
(and keep the `test` record pointing to the server, because renewal checks every name):

```bash
certbot --nginx --expand -d test.99visual.com -d 99visual.com -d www.99visual.com -m you@example.com --agree-tos --redirect
```

Certificates renew automatically. Open **https://www.99visual.com** and check:

- [ ] Home, services, work, insights and a few articles load, with images
- [ ] `https://99visual.com/about` redirects to `https://www.99visual.com/about`
- [ ] The contact form sends you the lead email
- [ ] Newsletter sign-up sends the 6-digit code, and confirming works
- [ ] A careers application with a CV arrives
- [ ] The chat assistant answers
- [ ] Admin login works; you can edit a post and upload an image
- [ ] Google Analytics *Realtime* shows your visit (after accepting analytics cookies)
- [ ] `https://www.99visual.com/sitemap.xml` and `/robots.txt` load

## 10. After the switch

- **Keep the Vercel project for a week** without changing it. If something goes wrong, put the DNS
  records back to Vercel's values (step 8 table) and it's live there again within minutes.
- **Leads during the switch:** for a few minutes some visitors may still have reached Vercel, which
  writes to Neon (those leads were also emailed to you). A day later, compare Neon (Neon console → SQL
  Editor) with the server:
  ```bash
  sudo -u postgres psql visual99 -c "SELECT count(*) FROM contact_leads; SELECT count(*) FROM newsletter_subscribers;"
  ```
- **After a week:** Vercel → project → Settings → **Domains** → remove 99visual.com and www.99visual.com.
  Keep the Neon database a little longer as an extra backup, then pause or delete it.
- Search Console needs nothing: the address is the same.

## 11. Publishing changes from now on

Vercel deployed automatically on every push; on the VPS it's one command:

1. Push your changes to GitHub (`main`) as usual.
2. Connect (step 3) and run:
   ```bash
   sudo -iu visual99 bash /var/www/99visual/deploy/server/deploy.sh
   ```

It pulls the latest code, applies new Prisma migrations, rebuilds and restarts without downtime. Run it
too after changing `.env`.

## 12. Backups

- Every night at 03:30 (server time) the database is backed up to `/var/backups/99visual` (14 days kept).
- **Download a copy to your PC every week** (a backup on the server is lost if the server is):
  ```powershell
  scp root@SERVER_IP:/var/backups/99visual/latest.dump .
  ```
- Also turn on Hostinger's own VPS backups/snapshots in hPanel (VPS → Backups).
- **Restore** a backup (replaces the current data):
  ```bash
  sudo -iu visual99 pm2 stop 99visual
  sudo -u postgres pg_restore --clean --if-exists --no-owner --role=visual99 -d visual99 < /var/backups/99visual/latest.dump
  sudo -iu visual99 pm2 start 99visual
  ```

## Troubleshooting

| Problem | What to do |
|---|---|
| Browser can't reach `http://SERVER_IP` | `ufw status` must list 80 and 443; check hPanel's VPS firewall (step 2.4) |
| `502 Bad Gateway` | The app isn't running: `sudo -iu visual99 pm2 logs 99visual --lines 50` |
| Build stopped / out of memory | Run `deploy.sh` again; check `free -h` |
| `copy-from-neon.sh` says Neon is newer | `apt-get install -y postgresql-client-18` (use the number shown), run again |
| `copy-from-neon.sh` can't connect | Use the **direct** Neon string (no `-pooler`) with `?sslmode=require`; make sure Neon isn't suspended |
| certbot fails | Both `99visual.com` and `www` must already point to `SERVER_IP` (`nslookup`); Cloudflare grey-cloud |
| Emails not sending | Check `EMAIL_USER` / `EMAIL_PASS` (a Gmail *app password*) in `.env`, then run `deploy.sh` |
| Logs | App: `sudo -iu visual99 pm2 logs 99visual` · nginx: `tail /var/log/nginx/error.log` · backups: `tail /var/log/99visual-backup.log` |

## What the setup secures

- Firewall: only SSH (22), HTTP (80) and HTTPS (443) are open; PostgreSQL listens on the server only.
- `fail2ban` blocks repeated SSH password guesses. Better still, add your SSH key in hPanel and turn
  off password login for root.
- Security updates install automatically every day.
- The app runs as its own unprivileged user; `.env` and backups are readable only by their owners.
- nginx overwrites the visitor address header, so it can't be faked to dodge rate limits.

## Adding Shilpikala later

The VPS has room for it: 99visual uses port 3100 and its own database, so Shilpikala can run next to it
on port 3000 with its own nginx site, database and user. Ask for its scripts to be adapted to share this
server's PostgreSQL 17 before running them (Shilpikala's own Hostinger script assumes a fresh server).
