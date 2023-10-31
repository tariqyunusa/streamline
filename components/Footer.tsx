import React from "react";
import "../styles/Footer.css";
import { footerLinks } from "@/utilis";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer_container">
        <div className="footer_info">
          <div className="logo company">
            <h1>
              STREAM<span className="span-1">LINE</span>
            </h1>
            <p>
              Streamline 2023
              <br />
              All Rights Reserved &copy;
            </p>
          </div>
        </div>
        <div className="footer_links">
          {footerLinks.map((link) => (
            <div key={link.title}>
              <h3 className="links_header">{link.title}</h3>
              <div className="links">
                {link.links.map((item) => (
                  <Link key={item.title} href={item.url} className="linker">
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
