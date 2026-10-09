import React from "react";
import { Check } from "lucide-react";
import { useI18n } from "@/i18n";

export default function Deliverables() {
  const { t } = useI18n();
  return (
    <section id="deliverables" className="relative py-28 border-t border-border overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">{t("deliverables.label")}</div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-balance">
            {t("deliverables.title1")}
            <br />
            <span className="text-primary">{t("deliverables.title2")}</span>
          </h2>
          <div className="mt-6 space-y-5 text-lg text-muted-foreground leading-relaxed">
            {t("deliverables.paragraphs").map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div>
          <div className="rounded-2xl border border-border bg-card/50 p-8">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
              {t("deliverables.listLabel")}
            </div>
            <ul className="space-y-3">
              {t("deliverables.items").map((d) => (
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
        </div>
      </div>
    </section>
  );
}