#!/usr/bin/env bash
# First-time install / redeploy of fromzero.ro on an Ubuntu/Debian VPS. Run as root
# from the folder that contains the unpacked project (package.json, src/, server/, deploy/).
set -euo pipefail
SRC="$(cd "$(dirname "$0")/.." && pwd)"
APP=/opt/fromzero/app

# 1. packages (Node 22 LTS, nginx, certbot) - only installed if missing
if ! command -v node >/dev/null || [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 20 ]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
command -v nginx   >/dev/null || apt-get install -y nginx
command -v certbot >/dev/null || apt-get install -y certbot python3-certbot-nginx
command -v rsync   >/dev/null || apt-get install -y rsync

# 2. service user + folders
id fromzero >/dev/null 2>&1 || useradd --system --home /opt/fromzero --shell /usr/sbin/nologin fromzero
mkdir -p "$APP" /opt/fromzero/data
rsync -a --delete --exclude node_modules --exclude dist --exclude data "$SRC"/ "$APP"/
[ -f /opt/fromzero/api.env ] || { cp "$APP/deploy/api.env.example" /opt/fromzero/api.env; chmod 600 /opt/fromzero/api.env; }
chown -R fromzero:fromzero /opt/fromzero

# 3. hero image (was hosted on Base44) -> served locally
[ -f "$APP/public/hero.png" ] || curl -fsSL -o "$APP/public/hero.png" \
  "https://media.base44.com/images/public/6ac4b7492a01b0314c27ad62/fddca7086_generated_image.png"

# 4. build
cd "$APP"
sudo -u fromzero npm ci --no-audit --no-fund
sudo -u fromzero npm run build

# 5. API service
cp deploy/fromzero-api.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now fromzero-api
systemctl restart fromzero-api

# 6. nginx
# copied only the first time: afterwards certbot edits this file (SSL), so a redeploy must not overwrite it
[ -f /etc/nginx/sites-available/fromzero ] || cp deploy/nginx-fromzero.conf /etc/nginx/sites-available/fromzero
rm -f /etc/nginx/sites-enabled/default   # nginx welcome page would otherwise answer on the IP
ln -sf /etc/nginx/sites-available/fromzero /etc/nginx/sites-enabled/fromzero
nginx -t && systemctl reload nginx

echo
echo "Done. API health: $(curl -s http://127.0.0.1:3001/api/health)"
echo "Site: http://$(hostname -I | awk '{print $1}')/"
echo "First time only, once DNS points here:  certbot --nginx -d fromzero.ro -d www.fromzero.ro"
