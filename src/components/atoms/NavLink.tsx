import React from "react";
import styles from "./NavLink.module.css";
import Skeleton from "./Skeleton";

interface NavLinkProps {
  label: string;
  href: string;
  loading?: boolean;
  active?: boolean;
  onClick?: () => void;
  /** Icon rendered only in drawer (mobile) mode */
  icon?: React.ReactNode;
  /** 'desktop' = underline style | 'drawer' = row with icon + bg pill */
  variant?: "desktop" | "drawer";
}

const NavLink: React.FC<NavLinkProps> = ({
  label,
  href,
  loading = false,
  active = false,
  onClick,
  icon,
  variant = "desktop",
}) => {
  if (loading) {
    return (
      <Skeleton
        width={72}
        height={14}
        borderRadius={4}
        className={styles.skeletonLink}
      />
    );
  }

  if (variant === "drawer") {
    return (
      <a
        href={href}
        className={`${styles.drawerLink} ${active ? styles.drawerActive : ""}`}
        onClick={onClick}
        aria-current={active ? "page" : undefined}
      >
        {icon && <span className={styles.drawerIcon}>{icon}</span>}
        <span className={styles.drawerLabel}>{label}</span>
        {active && <span className={styles.drawerDot} aria-hidden="true" />}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={`${styles.link} ${active ? styles.active : ""}`}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </a>
  );
};

export default NavLink;
