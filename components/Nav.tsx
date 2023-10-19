import React from "react";
import { ImSearch } from "react-icons/im";
import { Button } from ".";

const Nav = () => {
  return (
    <>
      <nav className="nav_section">
        <div className="personal_nav">
          <div className="logo">
            <h1>
              STREAM<span>LINE</span>
            </h1>
            <ul className="nav_ul">
              <li>Upcoming</li>
              <li>Movies</li>
              <li>Events</li>
              <li>Contact</li>
            </ul>
            <ul className="app_ul">
              <li>
                <ImSearch />
              </li>
              <li>EN</li>
              <Button title="Sign Up" />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
