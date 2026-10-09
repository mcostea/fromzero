import React from "react";
import { UserCheck, MessageSquare, KeyRound, Image, Lock, ClipboardCheck } from "lucide-react";
import { useI18n } from "@/i18n";

const ICONS = [UserCheck, MessageSquare, KeyRound, Image, Lock, ClipboardCheck];

export default function Requirements() {
  const { t } = useI18n();
  return (
    <section id="needs" className="relative py-28 border-t border-border overflow-hidden">
      <div className="absolute left-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-14">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">{t("needs.label")}</div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-balance">
            {t("needs.title1")}
            <br />
            <span className="text-primary">{t("needs.title2")}</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {t("needs.intro")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t("needs.items").map(({ title, body }, idx) => {
            const Icon = ICONS[idx] || ClipboardCheck;
            return (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card/50 p-6 hover:border-accent/40 hover:bg-accent/5 transition-colors"
            >
              <span className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center">
                <Icon className="h-5 w-5 text-accent" />
              </span>
              <div className="mt-4 font-semibold text-lg">{title}</div>
              <p className="mt-2 text-muted-foreground leading-relaxed">{body}</p>
            </div>
            );
          })}
        </div>

        <p className="mt-6 font-mono text-xs text-muted-foreground">
          {t("needs.note")}
        </p>
      </div>
    </section>
  );
}
