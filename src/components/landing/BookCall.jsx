import React, { useState } from "react";
import { Rich, useI18n } from "@/i18n";
import { Check, Loader2 } from "lucide-react";

export default function BookCall() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", project: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const key = res.status === 429 ? "book.errorRateLimit" : res.status === 400 ? "book.errorInvalid" : "book.errorGeneric";
        throw new Error(t(key));
      }
      setStatus("done");
      setForm({ name: "", email: "", project: "" });
    } catch (err) {
      setError(err instanceof TypeError ? t("book.errorGeneric") : err?.message || t("book.errorGeneric"));
      setStatus("error");
    }
  };

  return (
    <section id="book" className="relative py-28 border-t border-border">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border border-border bg-card/40 overflow-hidden">
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-2 p-8 md:p-10 bg-secondary/40 border-r border-border flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                  {t("book.label")}
                </div>
                <h2 className="font-display font-extrabold text-3xl tracking-tight">
                  {t("book.title")}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {t("book.intro")}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                {t("book.ready")}
              </div>
            </div>

            <div className="md:col-span-3 p-8 md:p-10">
              {status === "done" ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="h-14 w-14 rounded-full bg-accent/15 flex items-center justify-center mb-5">
                    <Check className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-2">{t("book.doneTitle")}</h3>
                  <p className="text-muted-foreground max-w-sm">
                    {t("book.doneBody")}
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 font-mono text-xs uppercase tracking-widest text-accent hover:underline"
                  >
                    {t("book.again")}
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label={t("book.nameLabel")}>
                      <input
                        required
                        value={form.name}
                        onChange={update("name")}
                        placeholder={t("book.namePlaceholder")}
                        className="input-base"
                      />
                    </Field>
                    <Field label={t("book.emailLabel")}>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        placeholder={t("book.emailPlaceholder")}
                        className="input-base"
                      />
                    </Field>
                  </div>
                  <Field label={t("book.projectLabel")}>
                    <textarea
                      required
                      value={form.project}
                      onChange={update("project")}
                      rows={4}
                      placeholder={t("book.projectPlaceholder")}
                      className="input-base resize-none"
                    />
                  </Field>

                  {error && (
                    <p className="text-sm text-destructive font-mono">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-primary-foreground hover:scale-[1.01] glow-primary transition-transform disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {status === "loading" ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> {t("book.sending")}</>
                    ) : (
                      t("book.submit")
                    )}
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    <Rich text={t("book.privacyNote")} />
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .input-base {
          width: 100%;
          border-radius: var(--radius);
          background: hsl(var(--background) / 0.6);
          border: 1px solid hsl(var(--border));
          padding: 0.7rem 0.9rem;
          font-size: 0.95rem;
          color: hsl(var(--foreground));
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input-base:focus {
          border-color: hsl(var(--accent));
          box-shadow: 0 0 0 3px hsl(var(--accent) / 0.2);
        }
        .input-base::placeholder { color: hsl(var(--muted-foreground) / 0.7); }
      `}</style>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}