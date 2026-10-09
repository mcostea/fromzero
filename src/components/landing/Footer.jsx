import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent glow-accent" />
          <span className="font-display font-extrabold tracking-tight">
            from<span className="text-accent">zero</span>.ro
          </span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <Link to="/privacy" className="hover:text-foreground transition-colors">
            {t("footer.privacy")}
          </Link>
          <span className="hidden md:inline text-border">|</span>
          <span>{t("footer.tagline")}</span>
        </div>
      </div>
    </footer>
  );
}