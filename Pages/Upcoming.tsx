import React from "react";
import Image from "next/image";
import undraw from "../public/undraw_under_construction_-46-pa.svg";
import styles from  "../styles/Upcoming.module.css";
import { Nav } from "@/components";

const Upcoming = () => {
  return (
    <div className={styles.upcoming_wrapper}>
      <Nav />
      <div className={styles.content_container}>
        <div className={styles.content_text}>
          <h2 className={styles.content_h2}>Page still under work</h2>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
