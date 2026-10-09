import React from "react";
import { Check, Clock } from "lucide-react";
import { useI18n } from "@/i18n";

export default function Scope() {
  const { t } = useI18n();
  return (
    <section id="scope" className="relative py-28 border-t border-border overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[24rem] w-[40rem] rounded-full bg-primary/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-14">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">{t("scope.label")}</div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-balance">
            {t("scope.title1")}
            <br />
            <span className="text-primary">{t("scope.title2")}</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {t("scope.intro")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card/50 p-8">
            <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
              {t("scope.fitsLabel")}
            </div>
            <ul className="space-y-3">
              {t("scope.fits").map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-4 hover:border-accent/40 hover:bg-accent/5 transition-colors"
                >
                  <span className="h-6 w-6 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 text-accent" />
                  </span>
                  <span className="text-foreground">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card/50 p-8">
            <div className="font-mono text-xs uppercase tracking-widest text-primary mb-6">
              {t("scope.moreLabel")}
            </div>
            <ul className="space-y-3">
              {t("scope.more").map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-4 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  <span className="h-6 w-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="text-foreground">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}