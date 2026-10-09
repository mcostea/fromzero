import { Link, useLocation } from "react-router-dom";
import { useI18n } from "@/i18n";

export default function PageNotFound() {
  const { t } = useI18n();
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background text-foreground">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="font-display font-extrabold text-7xl text-accent">404</h1>
        <h2 className="font-display font-bold text-2xl">{t("notFound.title")}</h2>
        <p className="text-muted-foreground">{t("notFound.body", { page: pageName })}</p>
        <Link
          to="/"
          className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:scale-[1.03] transition-transform"
        >
          {t("notFound.home")}
        </Link>
      </div>
    </div>
  );
}
