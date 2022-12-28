import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

import Link from "next/link";
import styles from "./MainNav.module.css";
import Bars from "../public/icons/bars";
import Close from "../public/icons/close";
import MenuModal from "./MenuModal";

const MainNav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [status]);

  const showMenuHandler = () => {
    setShowMenu(showMenu ? false : true);
  };

  return (
    <>
      <nav className={styles["container"]}>
        <div className={styles["img-wrapper"]}>
          <Link href="/">
            <img className={styles["img-logo"]} src="/images/bista-header.png" alt="Bista Cargo Logo" />
          </Link>
        </div>
        <ul className={styles["list-menu"]}>
          <Link href="/">
            <li className={styles["list-item"]}>Beranda</li>
          </Link>
          <Link href="/#about">
            <li className={styles["list-item"]}>Tentang</li>
          </Link>
          <Link href="/#layanan">
            <li className={styles["list-item"]}>Layanan</li>
          </Link>
          <Link href="/#lokasi">
            <li className={styles["list-item"]}>Lokasi</li>
          </Link>
          <Link href="/#kontak">
            <li className={styles["list-item"]}>Kontak</li>
          </Link>

          {status === "authenticated" ? (
            <Link href="/app">
              <li className={styles["list-item"]}>Member Area</li>
            </Link>
          ) : (
            <Link href="/auth">
              <li className={styles["list-item"]}>Login</li>
            </Link>
          )}
        </ul>
        <div className={styles["ham-menu-icon"]} onClick={showMenuHandler}>
          {showMenu ? <Close /> : <Bars />}
        </div>
      </nav>
      {showMenu ? <MenuModal onClick={showMenuHandler} status={status} /> : null}
    </>
  );
};

export default MainNav;
