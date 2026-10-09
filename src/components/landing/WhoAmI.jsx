import React from "react";
import { Linkedin } from "lucide-react";
import { useI18n } from "@/i18n";

const LINKEDIN_URL = "https://www.linkedin.com/in/mihai-costea-80364960/";

export default function WhoAmI() {
  const { t } = useI18n();
  return (
    <section id="whoami" className="relative py-28 border-t border-border overflow-hidden">
      <div className="absolute left-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">{t("whoami.label")}</div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-balance">
            {t("whoami.title1")}
            <br />
            <span className="text-primary">{t("whoami.title2")}</span>
          </h2>
          <div className="mt-6 space-y-5 text-lg text-muted-foreground leading-relaxed">
            {t("whoami.paragraphs").map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:scale-[1.03] transition-transform"
            >
              <Linkedin className="h-4 w-4" /> {t("whoami.linkedin")}
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            {t("whoami.stats").map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card/50 px-5 py-5">
                <div className="font-display font-extrabold text-3xl text-accent">{s.value}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card/50 p-8">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
              {t("whoami.careerLabel")}
            </div>
            <ol className="space-y-4">
              {t("whoami.timeline").map((t) => (
                <li key={t.years} className="sm:grid sm:grid-cols-[7.5rem_1fr] sm:gap-4 sm:items-baseline">
                  <span className="block font-mono text-xs text-accent">{t.years}</span>
                  <span>
                    <span className="font-semibold">{t.role}</span>
                    <span className="text-muted-foreground"> · {t.where}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
