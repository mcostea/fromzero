import React from "react";
import { ArrowRight, Check, Wrench, Wallet } from "lucide-react";
import { useI18n } from "@/i18n";

export default function Pricing() {
  const { t } = useI18n();
  return (
    <section id="pricing" className="relative py-28 border-t border-border overflow-hidden">
      <div className="absolute right-0 top-1/4 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-14">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">{t("pricing.label")}</div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-balance">
            {t("pricing.title1")}
            <br />
            <span className="text-primary">{t("pricing.title2")}</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {t("pricing.intro")}
          </p>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {t("pricing.steps").map((s, idx) => (
            <li key={s.title} className="rounded-xl border border-border bg-card/50 px-5 py-5">
              <div className="font-mono text-xs text-accent">{String(idx + 1).padStart(2, "0")}</div>
              <div className="mt-2 font-semibold">{s.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.body}</div>
            </li>
          ))}
        </ol>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card/50 p-8">
            <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
              {t("pricing.includedLabel")}
            </div>
            <ul className="space-y-3">
              {t("pricing.included").map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-4"
                >
                  <span className="h-6 w-6 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 text-accent" />
                  </span>
                  <span className="text-foreground">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card/50 p-8 flex flex-col">
            <div className="font-mono text-xs uppercase tracking-widest text-primary mb-6">
              {t("pricing.excludedLabel")}
            </div>
            <ul className="space-y-3">
              {t("pricing.excluded").map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-4"
                >
                  <span className="h-6 w-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Wallet className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="text-foreground">{d}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              {t("pricing.excludedNote")}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card/50 p-8 flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div className="flex items-start gap-4">
            <span className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
              <Wrench className="h-5 w-5 text-accent" />
            </span>
            <div>
              <div className="font-semibold text-lg">{t("pricing.afterTitle")}</div>
              <p className="mt-1 text-muted-foreground">
                {t("pricing.afterBody")}
              </p>
            </div>
          </div>
          <a
            href="#book"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:scale-[1.03] transition-transform shrink-0"
          >
            {t("pricing.cta")} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
