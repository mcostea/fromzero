import React from "react";
import { Search, Hammer, Rocket } from "lucide-react";
import { useI18n } from "@/i18n";

const ICONS = [Search, Hammer, Rocket];

export default function HowItWorks() {
  const { t } = useI18n();
  return (
    <section id="how" className="relative py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">{t("how.label")}</div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">
            {t("how.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("how.intro")}
          </p>
        </div>

        <ol className="grid md:grid-cols-3 gap-6">
          {t("how.phases").map((p, idx) => {
            const Icon = ICONS[idx] || Rocket;
            const no = String(idx + 1).padStart(2, "0");
            return (
              <li
                key={no}
                className="group relative rounded-2xl border border-border bg-card/50 p-8 hover:border-accent/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {p.days}
                  </span>
                  <span className="font-display text-4xl font-extrabold text-border group-hover:text-accent/30 transition-colors">
                    {no}
                  </span>
                </div>
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-2xl mb-3">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-5">{p.body}</p>
                <ul className="space-y-2 font-mono text-xs text-muted-foreground">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-accent" /> {pt}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}