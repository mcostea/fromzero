import React, { useEffect, useState } from "react";
import { ArrowDown, Zap } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useI18n } from "@/i18n";

const HERO_IMG = "/hero.png";

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

// meta.clock in the locale file: "utc" or an IANA time zone such as "Europe/Bucharest"
function formatTime(date, clock, locale) {
  const timeZone = clock === "utc" ? "UTC" : clock;
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function formatDate(date, clock, locale) {
  if (clock === "utc") return date.toISOString().slice(0, 10);
  return new Intl.DateTimeFormat(locale, { timeZone: clock, day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

export default function Hero() {
  const { t, meta } = useI18n();
  const now = useClock();
  const timeStr = formatTime(now, meta.clock, meta.htmlLang);
  const launch = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const launchStr = formatDate(launch, meta.clock, meta.htmlLang);

  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -right-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute -left-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-10 items-center w-full py-20">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 font-mono text-xs uppercase text-muted-foreground mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            {t("hero.status")} · {timeStr} {t("hero.clockSuffix")}
          </div>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-balance">
            {t("hero.titleFrom")} <span className="text-accent">{t("hero.titleZero")}</span> {t("hero.titleTo")}{" "}
            <span className="text-primary">{t("hero.titleLive")}</span>
            <br />
            {t("hero.titleIn")} <span className="text-accent">{t("hero.titleDays")}</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg text-muted-foreground leading-relaxed">{t("hero.subtitle")}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground hover:scale-[1.03] glow-primary transition-transform"
            >
              <Zap className="h-4 w-4" /> {t("hero.ctaPrimary")}
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 font-semibold hover:bg-card transition-colors"
            >
              {t("hero.ctaSecondary")} <ArrowDown className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-12 flex gap-10 font-mono">
            {t("hero.stats").map((s) => (
              <div key={s.label}>
                <div className={`text-3xl font-bold ${s.accent ? "text-accent" : "text-foreground"}`}>{s.value}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border glow-primary">
            <Image src={HERO_IMG} alt={t("hero.imageAlt")} className="h-full w-full" fittingType="fill" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-lg border border-border bg-card/90 backdrop-blur px-4 py-3 font-mono text-xs">
            <div className="text-muted-foreground uppercase">{t("hero.projectedLaunch")}</div>
            <div className="text-accent font-semibold">{launchStr}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
