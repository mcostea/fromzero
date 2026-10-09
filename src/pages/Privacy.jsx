import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/landing/Footer";
import { LanguageSwitcher, Rich, useI18n } from "@/i18n";

// ── Fill these in once the company is registered. Empty fields are not shown. ──
const CONTROLLER = {
  name: "fromzero.ro",          // e.g. "NOTIME SRL" or "Mihai Costea PFA"
  regNo: "",                    // e.g. "J12/1234/2026 · CUI RO12345678"
  address: "",                  // e.g. "Str. Exemplu 1, Cluj-Napoca, Romania"
};
const PRIVACY_EMAIL = "privacy@fromzero.ro";


export default function Privacy() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="h-2.5 w-2.5 rounded-full bg-accent glow-accent" />
            <span className="font-display font-extrabold tracking-tight text-lg">
              from<span className="text-accent">zero</span>.ro
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {t("privacy.back")}
            </Link>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <div className="absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl px-6 py-20">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">{t("privacy.label")}</div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-balance">
            {t("privacy.title1")}
            <br />
            <span className="text-primary">{t("privacy.title2")}</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {t("privacy.intro")}
          </p>

          <div className="mt-10 rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
              {t("privacy.controllerLabel")}
            </div>
            <div className="space-y-1">
              <div className="font-semibold">{CONTROLLER.name}</div>
              {CONTROLLER.regNo && <div className="text-muted-foreground">{CONTROLLER.regNo}</div>}
              {CONTROLLER.address && <div className="text-muted-foreground">{CONTROLLER.address}</div>}
              <a className="text-accent hover:underline" href={`mailto:${PRIVACY_EMAIL}`}>
                {PRIVACY_EMAIL}
              </a>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {t("privacy.sections").map((s) => (
              <section key={s.title} className="rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
                <h2 className="font-display font-bold text-xl mb-4">{s.title}</h2>
                <ul className="space-y-3 text-muted-foreground leading-relaxed [&_b]:text-foreground [&_b]:font-semibold">
                  {s.items.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      <span><Rich text={item.replaceAll("{email}", PRIVACY_EMAIL)} /></span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <p className="mt-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t("privacy.lastUpdated")}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
