import React from "react";
import { createPortal } from "react-dom";
import styles from "./NavMenu.module.css";
import NavLink from "../atoms/NavLink";
import Skeleton from "../atoms/Skeleton";

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavMenuProps {
  items: NavItem[];
  loading?: boolean;
  isOpen?: boolean;
  activeHref?: string;
  onLinkClick?: (href: string) => void;
  onClose?: () => void;
  cta?: React.ReactNode;
}

const SKELETON_WIDTHS = [56, 80, 76, 68];

const NavMenu: React.FC<NavMenuProps> = ({
  items,
  loading = false,
  isOpen = false,
  activeHref,
  onLinkClick,
  onClose,
  cta,
}) => {
  if (loading) {
    return (
      <div className={styles.skeletonNav} aria-hidden="true">
        {SKELETON_WIDTHS.map((w) => (
          <Skeleton key={`sk-nav-${w}`} width={w} height={14} borderRadius={4} />
        ))}
      </div>
    );
  }

  /* Drawer + backdrop rendered via portal so they escape the sticky
     header's stacking context and appear above the entire page. */
  const mobileOverlay = createPortal(
    <>
      {/* ── Backdrop ─────────────────────────────────── */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ""}`}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* ── Drawer ───────────────────────────────────── */}
      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}
        id="mobile-nav"
        aria-label="Menú de navegación"
      >
        {/* Branded header */}
        <div className={styles.drawerHeader}>
          <div className={styles.drawerBrand}>
            <span className={styles.drawerBrandIcon} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect width="20" height="20" rx="5" fill="white" fillOpacity="0.2" />
                <path d="M5 10h10M10 5v10" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <div>
              <p className={styles.drawerBrandName}>STP</p>
              <p className={styles.drawerBrandSub}>Sistema de Transferencias y Pagos</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className={styles.drawerNav} aria-label="Navegación principal">
          <p className={styles.drawerSectionLabel}>Menú</p>
          {items.map((item) => (
            <NavLink
              key={item.href}
              label={item.label}
              href={item.href}
              active={activeHref === item.href}
              onClick={() => onLinkClick?.(item.href)}
              icon={item.icon}
              variant="drawer"
            />
          ))}
        </nav>

        {/* CTA footer */}
        {cta && (
          <div className={styles.drawerFooter}>
            <div className={styles.drawerDivider} />
            {cta}
          </div>
        )}
      </aside>
    </>,
    document.body
  );

  return (
    <>
      {/* ── Desktop row ──────────────────────────────── */}
      <nav className={styles.desktopNav} aria-label="Navegación principal">
        {items.map((item) => (
          <NavLink
            key={item.href}
            label={item.label}
            href={item.href}
            active={activeHref === item.href}
            onClick={() => onLinkClick?.(item.href)}
          />
        ))}
      </nav>

      {mobileOverlay}
    </>
  );
};

export default NavMenu;
