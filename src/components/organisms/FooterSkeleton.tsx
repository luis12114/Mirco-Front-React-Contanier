import type { FC } from "react";
import Skeleton from "../atoms/Skeleton";
import styles from "./FooterSkeleton.module.css";

/**
 * Shimmer placeholder that mirrors the exact layout of the Footer organism.
 * Rendered while footer data / fonts are loading.
 */
const FooterSkeleton: FC = () => (
  <footer className={styles.footer} aria-label="Cargando pie de página" aria-busy="true">
    <div className={styles.inner}>

      {/* ── Top grid ──────────────────────────────────── */}
      <div className={styles.grid}>

        {/* Brand column */}
        <div className={styles.brand}>
          {/* Logo row */}
          <div className={styles.logoRow}>
            <Skeleton width={36} height={36} borderRadius={8} />
            <Skeleton width={48} height={22} borderRadius={4} />
          </div>

          {/* Description lines */}
          <div className={styles.descBlock}>
            <Skeleton width="100%" height={14} borderRadius={4} />
            <Skeleton width="92%" height={14} borderRadius={4} />
            <Skeleton width="72%" height={14} borderRadius={4} />
          </div>

          {/* Contact items */}
          <div className={styles.contactBlock}>
            {(["loc", "tel", "mail"] as const).map((id, _i, arr) => (
              <div key={id} className={styles.contactRow}>
                <Skeleton width={28} height={28} borderRadius={8} />
                <Skeleton width={[140, 120, 160][arr.indexOf(id)]} height={14} borderRadius={4} />
              </div>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        <div className={styles.navColumns}>
          {(["producto", "empresa"] as const).map((col) => (
            <div key={col} className={styles.navCol}>
              <Skeleton width={80} height={16} borderRadius={4} className={styles.navHeading} />
              {(["a", "b", "c", "d", "e"] as const).map((k, j) => (
                <Skeleton key={k} width={[100, 90, 110, 70, 95][j]} height={13} borderRadius={4} />
              ))}
            </div>
          ))}
        </div>

      </div>

      {/* ── Divider ───────────────────────────────────── */}
      <div className={styles.divider} />

      {/* ── Bottom bar ────────────────────────────────── */}
      <div className={styles.bottomBar}>
        <div className={styles.legalGroup}>
          {(["terms", "privacy", "legal"] as const).map((k, j) => (
            <Skeleton key={k} width={[120, 140, 80][j]} height={13} borderRadius={4} />
          ))}
        </div>
        <div className={styles.socialGroup}>
          {(["li", "tw", "yt"] as const).map((k) => (
            <Skeleton key={k} width={38} height={38} borderRadius={8} />
          ))}
        </div>
      </div>

      {/* ── Copyright ─────────────────────────────────── */}
      <div className={styles.copyright}>
        <Skeleton width={420} height={12} borderRadius={4} className={styles.copyrightLine} />
        <Skeleton width={260} height={12} borderRadius={4} className={styles.copyrightLine} />
      </div>

    </div>
  </footer>
);

export default FooterSkeleton;
