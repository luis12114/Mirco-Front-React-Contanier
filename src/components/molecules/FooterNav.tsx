import type { FC } from "react";
import styles from "./FooterNav.module.css";

export interface FooterNavLink {
  label: string;
  href: string;
}

interface Props {
  heading: string;
  links: FooterNavLink[];
}

const FooterNav: FC<Props> = ({ heading, links }) => (
  <div className={styles.column}>
    <h4 className={styles.heading}>{heading}</h4>
    <ul className={styles.list}>
      {links.map((link) => (
        <li key={link.href}>
          <a href={link.href} className={styles.link}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default FooterNav;
