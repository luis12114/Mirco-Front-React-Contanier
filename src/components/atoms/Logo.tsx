import React from "react";
import styles from "./Logo.module.css";
import Skeleton from "./Skeleton";

interface LogoProps {
  loading?: boolean;
  href?: string;
  inverted?: boolean;
}

/**
 * Brand logo — blue icon tile + "STP" wordmark.
 * Renders a shimmer skeleton while `loading` is true.
 */
const Logo: React.FC<LogoProps> = ({ loading = false, href = "/", inverted = false }) => {
  if (loading) {
    return (
      <div className={styles.skeletonWrapper} aria-hidden="true">
        <Skeleton
          width={36}
          height={36}
          borderRadius={8}
          className={styles.skeletonIcon}
        />
        <Skeleton
          width={48}
          height={20}
          borderRadius={4}
          className={styles.skeletonBrand}
        />
      </div>
    );
  }

  return (
    <a href={href} className={styles.wrapper} aria-label="STP — ir al inicio">
      <span className={styles.icon} aria-hidden="true">
        <span className={styles.iconText}>Logo</span>
      </span>
      <span className={styles.brand + (inverted ? " " + styles.brandInverted : "")}>STP</span>
    </a>
  );
};

export default Logo;
