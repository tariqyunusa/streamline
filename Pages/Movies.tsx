import React from "react";
import Image from "next/image";
import undraw from "../public/undraw_under_construction_-46-pa.svg";
import "../styles/Movies.module.css";
import { Nav } from "@/components";
const Movies = () => {
  return (
    <div className="upcoming_wrapper">
      <Nav />
      <div className="content-container">
        <div className="content-text">
          <h2 className="content_h2">Page still under work</h2>
        </div>
      </div>
    </div>
  );
};

export default Movies;
