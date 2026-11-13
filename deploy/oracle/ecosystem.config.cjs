// pm2 process for www.99visual.com. Started by deploy.sh; pm2 restarts it if it crashes and after a reboot.
module.exports = {
  apps: [
    {
      name: "99visual",
      cwd: "/var/www/99visual",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3100 -H 127.0.0.1",
      env: { NODE_ENV: "production" },
      max_memory_restart: "2G",
      autorestart: true,
      time: true,
    },
  ],
};
