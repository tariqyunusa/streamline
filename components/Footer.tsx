import React from "react";
import styles from '../styles/Footer.module.css'
import { footerLinks } from "@/utilis";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer_wrapper}>
      <div className={styles.footer_container}>
        <div className={styles.footer_info}>
          <div className={`${styles.logo} ${styles.company}`}>
            <h1 className={styles.footer_h1}>
              STREAM<span className={styles.span_1}>LINE</span>
            </h1>
            <p>
              Streamline 2023
              <br />
              All Rights Reserved &copy;
            </p>
          </div>
        </div>
        <div className={styles.footer_links}>
          {footerLinks.map((link) => (
            <div key={link.title}>
              <h3 className={styles.links_header}>{link.title}</h3>
              <div className={styles.links}>
                {link.links.map((item) => (
                  <Link key={item.title} href={item.url} className={styles.linker}>
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
