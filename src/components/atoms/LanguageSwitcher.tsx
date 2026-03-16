import type { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.css";

/**
 * Language switcher button.
 * – Accessible: aria-label describes the action, not the current state.
 * – Reads the active language from i18next and toggles ES ↔ EN.
 * – Updates document.documentElement.lang (done globally in i18n/index.ts).
 */
const LanguageSwitcher: FC = () => {
  const { i18n, t } = useTranslation();
  const isEs = i18n.language?.startsWith("es") ?? true;

  const toggle = () => {
    i18n.changeLanguage(isEs ? "en" : "es");
  };

  return (
    <button
      type="button"
      className={styles.switcher}
      onClick={toggle}
      aria-label={t("lang.switchLabel")}
      title={t("lang.switchLabel")}
    >
      {/* Globe icon */}
      <svg
        className={styles.globe}
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>

      {/* Language code badge */}
      <span className={styles.code} aria-hidden="true">
        {t("lang.currentCode")}
      </span>

      {/* Visually-hidden current language for screen readers */}
      <span className={styles.srOnly}>{t("lang.currentFull")}</span>
    </button>
  );
};

export default LanguageSwitcher;
