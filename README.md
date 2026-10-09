# fromzero.ro

Landing page (React + Vite + Tailwind). Formularul „Initiate build” trimite cererile la un API Node mic (`server/index.js`). API-ul le salvează în `data/bookings.jsonl` și trimite opțional o notificare pe email.

## Local

```bash
npm install
npm run server   # API pe 127.0.0.1:3001
npm run dev      # frontend; /api e redirecționat spre API
```

## Deploy pe Contabo (Ubuntu/Debian)

1. **DNS** la registrar: `A fromzero.ro` și `A www.fromzero.ro`, ambele cu IP-ul VPS-ului.
2. **Copiezi proiectul** pe server:
   ```bash
   scp fromzero.zip root@IP_VPS:/root/
   ssh root@IP_VPS
   apt-get install -y unzip && unzip -o fromzero.zip -d fromzero-src
   ```
3. **Instalezi**:
   ```bash
   bash fromzero-src/deploy/install.sh
   ```
   Scriptul instalează Node 22, nginx și certbot (doar dacă lipsesc), face build-ul în `/opt/fromzero/app` și pornește serviciul `fromzero-api`. Tot el configurează nginx.
4. **SSL** (o singură dată, după ce DNS-ul s-a propagat):
   ```bash
   certbot --nginx -d fromzero.ro -d www.fromzero.ro
   ```
5. **Notificări pe email.** După ce serverul de mail e pornit, completezi `SMTP_*` și `NOTIFY_TO` în `/opt/fromzero/api.env`, apoi rulezi `systemctl restart fromzero-api`.

**Redeploy:** copiezi noul zip, îl dezarhivezi și rulezi din nou `install.sh`. Nu atinge `api.env`, datele din `/opt/fromzero/data` sau configurația nginx modificată de certbot.

## Utile

```bash
tail -f /opt/fromzero/data/bookings.jsonl   # cererile primite
journalctl -u fromzero-api -f               # log API
```

## Mail pe același VPS

Mailcow și Stalwart vin fiecare cu propriul web server pe porturile 80/443, iar nginx-ul site-ului le ocupă deja.
- **Mailcow:** în `mailcow.conf` setezi `HTTP_PORT=8080`, `HTTPS_PORT=8443`, `HTTP_BIND=127.0.0.1`, `HTTPS_BIND=127.0.0.1`. Apoi adaugi în nginx un server block pentru `mail.fromzero.ro` care face proxy spre `127.0.0.1:8080`.
- **Stalwart:** lași admin-ul web pe portul 8080 și îl publici prin nginx pe `mail.fromzero.ro`.

Porturile de mail (25, 465, 587, 993) nu intră în conflict cu nginx.

## Limbi (i18n)

Toate textele site-ului sunt în `src/i18n/locales/`, câte un fișier JSON per limbă (`en.json`, `ro.json`).

- **Modifici un text:** editezi valoarea în fișierul limbii, apoi `npm run build`.
- **Adaugi o limbă:** copiezi `en.json` în, de exemplu, `de.json`, traduci valorile și schimbi blocul `meta`
  (`code`, `label` afișat în meniu, `name`, `htmlLang`, `clock`). Limba apare automat în comutatorul din meniu.
- **Ceasul din hero:** `meta.clock` este `"utc"` sau un fus orar IANA (ex. `"Europe/Bucharest"`, `"Europe/Berlin"`).
- **Formatare în texte:** `**bold**` și `[text](link)`; în pagina de GDPR, `{email}` e înlocuit cu adresa de contact.
- Cheile lipsă dintr-o limbă sunt luate automat din engleză.
- Limba implicită vine din limba browserului (ro → română, altfel engleză); alegerea vizitatorului se păstrează în browser.
