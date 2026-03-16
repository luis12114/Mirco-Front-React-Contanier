import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";
import Logo from "../atoms/Logo";
import Button from "../atoms/Button";
import NavMenu from "../molecules/NavMenu";
import type { NavItem } from "../molecules/NavMenu";
import Skeleton from "../atoms/Skeleton";
import LanguageSwitcher from "../atoms/LanguageSwitcher";

interface HeaderProps {
  /** Simulate a network delay (ms) to show the skeleton. Default: 0 */
  loadingDelay?: number;
}

/* Static SVG icons — defined outside the component to avoid re-creation */
const NAV_ICONS = {
  home: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  benefits: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  solutions: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  contact: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
};

/**
 * Site-wide sticky header with:
 * - Skeleton loading state (configurable delay).
 * - Sticky + scrolled-shadow behaviour.
 * - Responsive hamburger menu with animated open/close.
 * - Accessible markup: <header>, <nav>, aria-* attributes.
 */
const Header: React.FC<HeaderProps> = ({ loadingDelay = 1200 }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV_ITEMS: NavItem[] = useMemo(
    () => [
      { label: t("nav.home"),      href: "#inicio",     icon: NAV_ICONS.home      },
      { label: t("nav.benefits"),  href: "#beneficios", icon: NAV_ICONS.benefits  },
      { label: t("nav.solutions"), href: "#soluciones", icon: NAV_ICONS.solutions },
      { label: t("nav.contact"),   href: "#contacto",   icon: NAV_ICONS.contact   },
    ],
    [t]
  );

  const [activeHref, setActiveHref] = useState<string | undefined>(
    "#inicio"
  );

  /* ── Simulate async data / font readiness ───────────── */
  useEffect(() => {
    if (loadingDelay === 0) {
      setLoading(false);
      return;
    }
    const id = setTimeout(() => setLoading(false), loadingDelay);
    return () => clearTimeout(id);
  }, [loadingDelay]);

  /* ── Scroll shadow ──────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close menu on resize to desktop ───────────────── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);


  const handleLinkClick = (href: string) => {
    setActiveHref(href);
    setMenuOpen(false);
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      role="banner"
    >
      <div className={styles.inner}>
        {/* ── Logo ──────────────────────────────────────── */}
        <Logo loading={loading} href="#inicio" />

        {/* ── Navigation ────────────────────────────────── */}
        <NavMenu
          items={NAV_ITEMS}
          loading={loading}
          isOpen={menuOpen}
          activeHref={activeHref}
          onLinkClick={handleLinkClick}
          onClose={() => setMenuOpen(false)}
          cta={
            <Button
              label={t("nav.cta")}
              href="#contacto"
              fullWidth
            />
          }
        />

        {/* ── Right actions ─────────────────────────────── */}
        <div className={styles.actions}>
          <span className={styles.desktopCta}>
            <Button
              label={t("nav.cta")}
              loading={loading}
              href="#contacto"
            />
          </span>

          {/* Language switcher */}
          {!loading && <LanguageSwitcher />}

          {/* Hamburger — mobile only */}
          {loading ? (
            <Skeleton width={40} height={40} borderRadius={8} />
          ) : (
            <button
              className={`${styles.menuToggle} ${menuOpen ? styles.open : ""}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            >
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </button>
          )}
        </div>
      </div>

    </header>
  );
};

export default Header;
