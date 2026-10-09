import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

// Every JSON file in ./locales is picked up automatically.
// To add a language: copy en.json to e.g. de.json, translate it, rebuild. Nothing else to change.
const modules = import.meta.glob("./locales/*.json", { eager: true });

const LOCALES = Object.fromEntries(
  Object.values(modules).map((m) => {
    const data = m.default ?? m;
    return [data.meta.code, data];
  })
);

const FALLBACK = "en";
const STORAGE_KEY = "lang";

// Order shown in the switcher: English first, then the rest alphabetically.
export const LANGUAGES = Object.values(LOCALES)
  .map((l) => l.meta)
  .sort((a, b) => (a.code === FALLBACK ? -1 : b.code === FALLBACK ? 1 : a.code.localeCompare(b.code)));

function initialLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && LOCALES[saved]) return saved;
  } catch {
    /* storage unavailable */
  }
  const browser = (navigator.languages || [navigator.language || ""])
    .map((l) => l.slice(0, 2).toLowerCase())
    .find((l) => LOCALES[l]);
  return browser || FALLBACK;
}

function lookup(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

function interpolate(str, vars) {
  if (!vars || typeof str !== "string") return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`));
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  const setLang = useCallback((code) => {
    if (!LOCALES[code]) return;
    setLangState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const t = useCallback(
    (path, vars) => {
      let value = lookup(LOCALES[lang], path);
      if (value === undefined) value = lookup(LOCALES[FALLBACK], path);
      if (value === undefined) return path;
      return interpolate(value, vars);
    },
    [lang]
  );

  const meta = LOCALES[lang].meta;

  useEffect(() => {
    document.documentElement.lang = meta.htmlLang || meta.code;
    if (meta.title) document.title = meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && meta.description) desc.setAttribute("content", meta.description);
  }, [meta]);

  const value = useMemo(() => ({ lang, setLang, t, meta }), [lang, setLang, t, meta]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

/**
 * Renders a translated string with light markup:
 *   **bold**        → <b>
 *   [label](href)   → link (internal "/..." links use the router)
 */
export function Rich({ text, linkClassName = "text-accent hover:underline" }) {
  const parts = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      parts.push(<b key={i++}>{m[1]}</b>);
    } else {
      const [label, href] = [m[2], m[3]];
      if (href.startsWith("/")) {
        parts.push(
          <Link key={i++} to={href} className={linkClassName}>
            {label}
          </Link>
        );
      } else {
        const external = /^https?:/.test(href);
        parts.push(
          <a
            key={i++}
            href={href}
            className={linkClassName}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {label}
          </a>
        );
      }
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export function LanguageSwitcher({ className = "" }) {
  const { lang, setLang, t } = useI18n();
  if (LANGUAGES.length < 2) return null;
  return (
    <div
      role="group"
      aria-label={t("nav.language")}
      className={`inline-flex items-center rounded-full border border-border p-0.5 font-mono text-xs ${className}`}
    >
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          title={l.name}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            lang === l.code ? "bg-accent text-background font-semibold" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
