import React from "react";
import { ArrowUpRight } from "lucide-react";
import { LanguageSwitcher, useI18n } from "@/i18n";

const LINKS = ["how", "mission", "whoami", "deliverables", "scope", "pricing"];

export default function Nav() {
  const { t } = useI18n();
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2 group shrink-0">
          <span className="h-2.5 w-2.5 rounded-full bg-accent glow-accent group-hover:scale-125 transition-transform" />
          <span className="font-display font-extrabold tracking-tight text-lg">
            from<span className="text-accent">zero</span>.ro
          </span>
        </a>
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {LINKS.map((id) => (
            <a key={id} href={`#${id}`} className="hover:text-foreground transition-colors whitespace-nowrap">
              {t(`nav.${id}`)}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <LanguageSwitcher />
          <a
            href="#book"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:scale-[1.03] transition-transform whitespace-nowrap"
          >
            {t("nav.cta")} <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  );
}
