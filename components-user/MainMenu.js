import React from "react";
import styles from "./MainMenu.module.css";
import Search from "../public/icons/search";
import Home from "../public/icons/home";
import Money from "../public/icons/money";
const MainMenu = () => {
  return (
    <section className={styles["container"]}>
      <div className={`${styles["card"]} ${styles["black"]}`}>
        <div className={styles["icon"]}>
          <Search />
        </div>
        <div className={styles["text"]}>
          <h1>Cek Paket</h1>
          <p>Lihat status paket terkini</p>
        </div>
      </div>
      <div className={`${styles["card"]} ${styles["red"]}`}>
        <div className={styles["icon"]}>
          <Money />
        </div>
        <div className={styles["text"]}>
          <h1>Cek Tarif</h1>
          <p>Lihat tarif Bista Cargo</p>
        </div>
      </div>
      <div className={`${styles["card"]} ${styles["black"]}`}>
        <div className={styles["icon"]}>
          <Home />
        </div>
        <div className={styles["text"]}>
          <h1>Cabang</h1>
          <p>Lihat lokasi cabang terdekat</p>
        </div>
      </div>
    </section>
  );
};

export default MainMenu;
