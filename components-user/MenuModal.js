import Link from "next/link";
import React from "react";
import styles from "./MenuModal.module.css";
import ArrowDown from "../public/icons/ArrowDown";

const MenuModal = (props) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["backdrop"]} onClick={props.onClick}></div>
      <nav className={styles["list-menu-mobile"]} onClick={props.onClick}>
        <Link href="/">
          <section className={styles["list-item"]}>
            <span className={styles["menu-title"]}>Beranda</span>
            <span className={styles["menu-icon"]}>
              <ArrowDown />
            </span>
          </section>
        </Link>
        <Link href="/#about">
          <section className={styles["list-item"]}>
            <span className={styles["menu-title"]}>Tentang</span>
            <span className={styles["menu-icon"]}>
              <ArrowDown />
            </span>
          </section>
        </Link>
        <Link href="/#layanan">
          <section className={styles["list-item"]}>
            <span className={styles["menu-title"]}>Layanan</span>
            <span className={styles["menu-icon"]}>
              <ArrowDown />
            </span>
          </section>
        </Link>
        <Link href="/#lokasi">
          <section className={styles["list-item"]}>
            <span className={styles["menu-title"]}>Lokasi</span>
            <span className={styles["menu-icon"]}>
              <ArrowDown />
            </span>
          </section>
        </Link>
        <Link href="/#kontak">
          <section className={styles["list-item"]}>
            <span className={styles["menu-title"]}>Kontak</span>
            <span className={styles["menu-icon"]}>
              <ArrowDown />
            </span>
          </section>
        </Link>
        {props.status === "authenticated" ? (
          <Link href="/app">
            <section className={styles["list-item"]}>
              <span className={styles["menu-title"]}>Member Area</span>
              <span className={styles["menu-icon"]}>
                <ArrowDown />
              </span>
            </section>
          </Link>
        ) : (
          <Link href="/auth">
            <section className={styles["list-item"]}>
              <span className={styles["menu-title"]}>Login</span>
              <span className={styles["menu-icon"]}>
                <ArrowDown />
              </span>
            </section>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default MenuModal;
