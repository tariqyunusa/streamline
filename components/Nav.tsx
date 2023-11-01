"use client";
import React, { useRef } from "react";
import { ImSearch } from "react-icons/im";
import { Button } from ".";
import "../styles/Nav.css";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const Nav = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const showBar = () => {
    wrapperRef.current?.classList.toggle("toggle-menu");
  };
  return (
    <>
      <nav className="nav_section">
        <div className="personal_nav">
          <div className="logo">
            <h1>
              STREAM<span className="span-1">LINE</span>
            </h1>
          </div>

          <div ref={wrapperRef} className="wrapper">
            <ul className="nav_ul">
              <Link href="./" className="li">
                Upcoming
              </Link>
              <Link href="./" className="li">
                Movies
              </Link>
              <Link href="./" className="li">
                Events
              </Link>
              <Link href="./" className="li">
                Contact
              </Link>
            </ul>
            <button className="btn-nav times" onClick={showBar}>
              <FaTimes />
            </button>
          </div>
          <div className="nav-end">
            <ul className="app_ul">
              <li>
                <ImSearch />
              </li>
              <li className="lang">EN</li>
              <Button title="Sign Up" />
            </ul>
          </div>
        </div>
        <button className="btn-nav bars" onClick={showBar}>
          <FaBars />
        </button>
      </nav>
    </>
  );
};

export default Nav;
