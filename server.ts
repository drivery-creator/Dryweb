import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.join(__dirname, ".data");
const WAITLIST_FILE = path.join(DATA_DIR, "waitlist.json");

interface WaitlistEntry {
  email: string;
  platform: "Android" | "iOS" | "Ambos";
  focus: string;
  referralCode: string;
  position: number;
  createdAt: string;
}

function readWaitlist(): WaitlistEntry[] {
  try {
    if (!fs.existsSync(WAITLIST_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(WAITLIST_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeWaitlist(entries: WaitlistEntry[]): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify(entries, null, 2), "utf-8");
}

function generateReferralCode(email: string): string {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = (hash * 31 + email.charCodeAt(i)) >>> 0;
  }
  return `DRV-${hash.toString(36).toUpperCase().slice(0, 6).padEnd(6, "0")}`;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "32kb" }));

  // Health & waitlist summary
  app.get("/api/waitlist/stats", (_req, res) => {
    const entries = readWaitlist();
    res.json({
      totalRegistered: entries.length,
      betaPhase: "Pre-lanzamiento Beta",
    });
  });

  // Register email in exclusive beta waitlist
  app.post("/api/waitlist", (req, res) => {
    const rawEmail = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const platformInput = req.body?.platform;
    const focusInput = typeof req.body?.focus === "string" ? req.body.focus.trim().slice(0, 120) : "Ecosistema completo";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(rawEmail)) {
      res.status(400).json({
        ok: false,
        error: "Introduce una dirección de correo electrónico válida.",
      });
      return;
    }

    const platform: "Android" | "iOS" | "Ambos" =
      platformInput === "iOS" || platformInput === "Ambos" ? platformInput : "Android";

    const entries = readWaitlist();
    const existing = entries.find((item) => item.email === rawEmail);
    if (existing) {
      res.status(200).json({
        ok: true,
        alreadyRegistered: true,
        position: existing.position,
        referralCode: existing.referralCode,
        platform: existing.platform,
        message: "Tu correo ya está registrado en la lista prioritaria de DRIVERY OS.",
      });
      return;
    }

    const nextPosition = entries.length + 1;
    const entry: WaitlistEntry = {
      email: rawEmail,
      platform,
      focus: focusInput || "Ecosistema completo",
      referralCode: generateReferralCode(rawEmail),
      position: nextPosition,
      createdAt: new Date().toISOString(),
    };

    entries.push(entry);
    try {
      writeWaitlist(entries);
    } catch {
      // Non-fatal in read-only runtimes; still confirm in-session
    }

    res.status(201).json({
      ok: true,
      alreadyRegistered: false,
      position: entry.position,
      referralCode: entry.referralCode,
      platform: entry.platform,
      message: "Plaza reservada en la beta cerrada de DRIVERY OS.",
    });
  });

  const isProd = process.env.NODE_ENV === "production";
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath, { maxAge: "7d" }));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DRIVERY OS server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
