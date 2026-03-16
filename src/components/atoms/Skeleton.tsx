import React from "react";
import styles from "./Skeleton.module.css";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

/**
 * Reusable shimmer skeleton placeholder.
 * Drop-in replacement while async content loads.
 */
const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "1rem",
  borderRadius = 4,
  className = "",
}) => (
  <span
    className={`${styles.skeleton} ${className}`}
    style={{ width, height, borderRadius }}
    aria-hidden="true"
  />
);

export default Skeleton;
