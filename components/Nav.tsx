"use client";
import React, { useRef } from "react";
import { ImSearch } from "react-icons/im";
import { Button } from ".";
import styles from '../styles/Nav.module.css'
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const Nav = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const showBar = () => {
    wrapperRef.current?.classList.toggle(`${styles.toggle_menu}`);
  };
  return (
    <>
      <nav className={styles.nav_section}>
        <div className={styles.personal_nav}>
          <Link href="./" className={styles.logo}>
            <h1>
              STREAM<span className={styles.span_1}>LINE</span>
            </h1>
          </Link>

          <div ref={wrapperRef} className={styles.wrapper}>
            <ul className={styles.nav_ul}>
              <Link href="/Upcoming" className={styles.li}>
                Upcoming
              </Link>
              <Link href="/Movies" className={styles.li}>
                Movies
              </Link>
              <Link href="/Events" className={styles.li}>
                Events
              </Link>
              <Link href="/Contact" className={styles.li}>
                Contact
              </Link>
            </ul>
            <button className={`${styles.btn_nav} ${styles.times}`} onClick={showBar}>
              <FaTimes />
            </button>
          </div>
          <div className={styles.nav_end}>
            <ul className={styles.app_ul}>
              <li>
                <ImSearch />
              </li>
              <li className={styles.lang}>EN</li>
              <Button title="Sign Up" />
            </ul>
          </div>
        </div>
        <button className={`${styles.btn_nav} ${styles.bars}`} onClick={showBar}>
          <FaBars />
        </button>
      </nav>
    </>
  );
};

export default Nav;
