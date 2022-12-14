import React from "react";
import styles from "./MainMenu.module.css";
import Search from "../public/icons/search";
import Money from "../public/icons/money";
import { useRouter } from "next/router";
import CallCenter from "../public/icons/CallCenter";
const MainMenu = () => {
  const router = useRouter();

  const ongkirHandler = () => {
    router.push("/cek-tarif");
  };

  const trackingHandler = () => {
    router.push("/cek-paket");
  };

  return (
    <section className={styles["container"]}>
      <div className={`${styles["card"]} ${styles["black"]}`}>
        <div className={styles["icon"]}>
          <Search />
        </div>
        <div className={styles["text"]} onClick={trackingHandler}>
          <h1>Cek Paket</h1>
          <p>Lihat status paket terkini</p>
        </div>
      </div>
      <div className={`${styles["card"]} ${styles["red"]}`} onClick={ongkirHandler}>
        <div className={styles["icon"]}>
          <Money />
        </div>
        <div className={styles["text"]}>
          <h1>Cek Tarif</h1>
          <p>Lihat tarif Bista Cargo</p>
        </div>
      </div>
      <a href="http://wa.me/6287846214666" target="_blank" className={`${styles["card"]} ${styles["black"]}`}>
        <div className={styles["icon"]}>
          <CallCenter color="#fff" />
        </div>
        <div className={styles["text"]}>
          <h1>Call Center</h1>
          <p>Silahkan hubungi kami</p>
        </div>
      </a>
    </section>
  );
};

export default MainMenu;
