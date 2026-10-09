import React from "react";
import { useI18n } from "@/i18n";

export default function About() {
  const { t } = useI18n();
  const TOOLS = t("mission.tools");
  return (
    <section id="mission" className="relative py-28 border-t border-border overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">{t("mission.label")}</div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-balance">
            {t("mission.title1")}
            <br />
            <span className="text-primary">{t("mission.title2")}</span>
          </h2>
          <div className="mt-6 space-y-5 text-lg text-muted-foreground leading-relaxed">
            {t("mission.paragraphs").map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div>
          <div className="rounded-2xl border border-border bg-card/50 p-8">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
              {t("mission.toolStackLabel")}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {TOOLS.map((t, i) => (
                <div
                  key={t}
                  className={`${TOOLS.length % 2 && i === TOOLS.length - 1 ? "col-span-2 " : ""}rounded-xl border border-border bg-background/60 px-4 py-5 font-mono text-sm flex items-center gap-3 hover:border-accent/40 hover:bg-accent/5 transition-colors`}
                >
                  <span className="h-2 w-2 rounded-full bg-accent glow-accent" />
                  {t}
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border font-mono text-xs text-muted-foreground">
              {t("mission.equation")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}