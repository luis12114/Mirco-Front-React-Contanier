import React from "react";
import styles from "./Button.module.css";
import Skeleton from "./Skeleton";

interface ButtonProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  /** Visual style: 'primary' (filled blue) | 'secondary' (outlined) */
  variant?: "primary" | "secondary";
  /** Button size: 'sm' | 'md' (default) | 'lg' */
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  /** Optional leading icon */
  icon?: React.ReactNode;
}

/**
 * CTA button atom.
 * - Renders shimmer skeleton while `loading` is true.
 * - Supports rendering as an anchor when `href` is provided.
 */
const Button: React.FC<ButtonProps> = ({
  label,
  loading = false,
  disabled = false,
  onClick,
  href,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
}) => {
  const sizeHeights: Record<string, number> = { sm: 36, md: 44, lg: 52 };

  if (loading) {
    return (
      <Skeleton
        width={fullWidth ? "100%" : 164}
        height={sizeHeights[size]}
        borderRadius={10}
        className={styles.skeletonBtn}
      />
    );
  }

  const className = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      {label}
    </>
  );

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
