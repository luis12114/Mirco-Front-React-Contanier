import type { FC } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../atoms/Logo";
import FooterNav from "../molecules/FooterNav";
import FooterSkeleton from "./FooterSkeleton";
import styles from "./Footer.module.css";

interface FooterProps {
  /** Show shimmer skeleton while content is loading */
  loading?: boolean;
}

/* ── Contact icons ─────────────────────────────────────── */
const IconLocation = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
);

const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.99 1.18 2 2 0 012.98 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/>
  </svg>
);

const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
);

/* ── Social icons ──────────────────────────────────────── */
const IconLinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const IconTwitter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const IconYoutube = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0f172a"/>
  </svg>
);

/* ── Social (brand names — no translation needed) ─────── */
const SOCIAL = [
  { label: "LinkedIn", href: "https://linkedin.com",  Icon: IconLinkedIn },
  { label: "Twitter",  href: "https://twitter.com",   Icon: IconTwitter  },
  { label: "YouTube",  href: "https://youtube.com",   Icon: IconYoutube  },
];

/* ── Component ─────────────────────────────────────────── */
const Footer: FC<FooterProps> = ({ loading = false }) => {
  const { t } = useTranslation();

  if (loading) return <FooterSkeleton />;

  const PRODUCTO_LINKS = [
    { label: t("footer.productLinks.features"),     href: "#caracteristicas" },
    { label: t("footer.productLinks.integrations"), href: "#integraciones" },
    { label: t("footer.productLinks.docs"),         href: "#documentacion" },
    { label: t("footer.productLinks.pricing"),      href: "#precios" },
    { label: t("footer.productLinks.api"),          href: "#api" },
  ];

  const EMPRESA_LINKS = [
    { label: t("footer.companyLinks.about"),    href: "#acerca" },
    { label: t("footer.companyLinks.blog"),     href: "#blog" },
    { label: t("footer.companyLinks.careers"),  href: "#carreras" },
    { label: t("footer.companyLinks.support"),  href: "#soporte" },
    { label: t("footer.companyLinks.contact"),  href: "#contacto" },
  ];

  const LEGAL_LINKS = [
    { label: t("footer.legalLinks.terms"),   href: "#terminos" },
    { label: t("footer.legalLinks.privacy"), href: "#privacidad" },
    { label: t("footer.legalLinks.legal"),   href: "#aviso" },
  ];

  return (
    <footer className={styles.footer} aria-label={t("footer.ariaLabel")}>
    <div className={styles.inner}>

      {/* ── Top grid ──────────────────────────────────── */}
      <div className={styles.grid}>

        {/* Brand column */}
        <div className={styles.brand}>
          <Logo inverted href="/" />
          <p className={styles.description}>
            {t("footer.description")}
          </p>
          <address className={styles.contactList}>
            <p className={styles.contactItem}>
              <span className={styles.contactIcon}><IconLocation /></span>
              <span>{t("footer.address")}</span>
            </p>
            <p className={styles.contactItem}>
              <span className={styles.contactIcon}><IconPhone /></span>
              <a href="tel:+525512345678" className={styles.contactLink}>{t("footer.phone")}</a>
            </p>
            <p className={styles.contactItem}>
              <span className={styles.contactIcon}><IconMail /></span>
              <a href="mailto:contacto@stp.com.mx" className={styles.contactLink}>{t("footer.email")}</a>
            </p>
          </address>
        </div>

        {/* Nav columns */}
        <div className={styles.navColumns}>
          <FooterNav heading={t("footer.productHeading")} links={PRODUCTO_LINKS} />
          <FooterNav heading={t("footer.companyHeading")} links={EMPRESA_LINKS}  />
        </div>

      </div>

      {/* ── Divider ───────────────────────────────────── */}
      <hr className={styles.divider} />

      {/* ── Bottom bar ────────────────────────────────── */}
      <div className={styles.bottomBar}>
        <nav className={styles.legalLinks} aria-label={t("footer.legalAriaLabel")}>
          {LEGAL_LINKS.map((l, i) => (
            <a key={l.href} href={l.href} className={styles.legalLink}>
              {i > 0 && <span className={styles.legalSep} aria-hidden="true">·</span>}
              {l.label}
            </a>
          ))}
        </nav>
        <div className={styles.socialLinks}>
          {SOCIAL.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              className={styles.socialBtn}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {/* ── Copyright ─────────────────────────────────── */}
      <div className={styles.copyright}>
        <p>{t("footer.copyright")}</p>
        <p>{t("footer.regulated")}</p>
      </div>

    </div>
  </footer>
  );
};

export default Footer;
