import React from "react";
import styles from "../styles/Loader.module.css"

const Loader = () => {
  return (
    <div className={styles.Loader_wrapper}>
      <h2 className={styles.Loader_h2}>
        Stream<span className={styles.Loader_span}>Line</span>
      </h2>
    </div>
  );
};

export default Loader;
