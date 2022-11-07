import React, { useEffect, useState } from "react";
import styles from "./Jumbotron.module.css";
import TextSlider from "./TextSlider";

const Jumbotron = () => {
  return (
    <header className={styles["container"]}>
      <div>
        <img
          className={styles["jumbo-img"]}
          src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="kepercayaan konsumen"
        ></img>
      </div>
      <div className={styles["jumbo-txt"]}>
        <TextSlider />
      </div>
    </header>
  );
};

export default Jumbotron;
