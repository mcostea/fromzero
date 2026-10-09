// Minimal API for the fromzero.ro booking form.
// POST /api/booking  {name, email, project}
//  -> appends to DATA_DIR/bookings.jsonl
//  -> emails a notification to NOTIFY_TO via the local mail server (if SMTP_HOST is set)
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";

const PORT = Number(process.env.PORT || 3001);
const HOST = process.env.HOST || "127.0.0.1";
const DATA_DIR = process.env.DATA_DIR || path.resolve("data");
const NOTIFY_TO = process.env.NOTIFY_TO || "";
const MAIL_FROM = process.env.MAIL_FROM || "fromzero.ro <noreply@fromzero.ro>";

fs.mkdirSync(DATA_DIR, { recursive: true });
const FILE = path.join(DATA_DIR, "bookings.jsonl");

const mailer = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    })
  : null;

// naive per-IP rate limit: 5 submissions / 10 min
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validate(b) {
  const name = String(b?.name ?? "").trim();
  const email = String(b?.email ?? "").trim();
  const project = String(b?.project ?? "").trim();
  if (name.length < 2 || name.length > 200) return { error: "Please enter your name." };
  if (!EMAIL_RE.test(email) || email.length > 254) return { error: "Please enter a valid email." };
  if (project.length < 5 || project.length > 5000) return { error: "Please describe your project (at least 5 characters)." };
  return { value: { name, email, project } };
}

function send(res, status, obj) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(obj));
}

const server = http.createServer((req, res) => {
  if (req.url === "/api/health") return send(res, 200, { ok: true });
  if (req.url !== "/api/booking" || req.method !== "POST") return send(res, 404, { error: "Not found" });

  const ip = req.headers["x-real-ip"] || req.socket.remoteAddress;
  if (limited(ip)) return send(res, 429, { error: "Too many requests. Please try again later." });

  let body = "";
  req.on("data", (c) => {
    body += c;
    if (body.length > 20000) req.destroy();
  });
  req.on("end", async () => {
    let parsed;
    try { parsed = JSON.parse(body); } catch { return send(res, 400, { error: "Invalid request." }); }
    const { value, error } = validate(parsed);
    if (error) return send(res, 400, { error });

    const record = { ...value, created_at: new Date().toISOString(), ip };
    try {
      fs.appendFileSync(FILE, JSON.stringify(record) + "\n");
    } catch (e) {
      console.error("write failed", e);
      return send(res, 500, { error: "Something went wrong. Please try again." });
    }
    send(res, 200, { ok: true });

    if (mailer && NOTIFY_TO) {
      mailer
        .sendMail({
          from: MAIL_FROM,
          to: NOTIFY_TO,
          replyTo: value.email,
          subject: `New fromzero booking: ${value.name}`,
          text: `Name: ${value.name}\nEmail: ${value.email}\n\n${value.project}\n\n— ${record.created_at}`,
        })
        .catch((e) => console.error("notify mail failed", e.message));
    }
  });
});

server.listen(PORT, HOST, () => console.log(`fromzero api on http://${HOST}:${PORT}`));
