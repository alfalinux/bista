import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import styles from "./Sidemenu.module.css";
import HomeIcon from "../public/icons/HomeIcon";
import TruckIcon from "../public/icons/TruckIcon";
import RocketIcon from "../public/icons/RocketIcon";
import ReportIcon from "../public/icons/ReportIcon";

const Sidemenu = (props) => {
  const [outgoingSubmenu, setOutgoingSubmenu] = useState(false);
  const [incomingSubmenu, setIncomingSubmenu] = useState(false);
  const [showReprintMenu, setShowReprintMenu] = useState(false);
  const showMobileMenu = props.style;
  const router = useRouter();

  const outgoingMenuHandler = () => {
    setOutgoingSubmenu(outgoingSubmenu ? false : true);
  };

  const incomingMenuHandler = () => {
    setIncomingSubmenu(incomingSubmenu ? false : true);
  };

  const showReprintMenuHandler = (e) => {
    setShowReprintMenu(showReprintMenu ? false : true);
  };

  const outgoingSubmenuIsValid = outgoingSubmenu || router.pathname.startsWith("/app/outgoing");
  const incomingSubmenuIsValid = incomingSubmenu || router.pathname.startsWith("/app/incoming");
  const reprintSubmenuIsValid = showReprintMenu || router.pathname.startsWith("/app/reprint");

  return (
    <nav className={showMobileMenu ? styles["mobile-side-menu"] : styles["container"]}>
      <Link href="/">
        <img src="/images/bista-logo-300.png" alt="bista cargo logo" className={styles["container-logo"]} />
      </Link>
      <section className={styles["menu-bar"]}>
        <Link href="/app">
          <div className={router.pathname === "/app" ? styles["menu-active"] : styles["menu-btn"]}>
            <div className={styles["menu-title"]}>
              <HomeIcon />
              <p className={styles["text-icon"]}>Dashboard</p>
            </div>
          </div>
        </Link>

        {/* --- Outgoing Menu */}
        <div
          className={router.pathname.startsWith("/app/outgoing") ? styles["menu-active"] : styles["menu-btn"]}
          onClick={outgoingMenuHandler}
        >
          <div className={styles["menu-title"]}>
            <RocketIcon />
            <p className={styles["text-icon"]}>Outgoing</p>
          </div>
          {outgoingSubmenuIsValid && (
            <ul className={styles["menu-list"]}>
              <Link href="/app/outgoing/create-resi">
                <li
                  className={router.pathname === "/app/outgoing/create-resi" ? styles["list-active"] : styles["list"]}
                >
                  Create Order
                </li>
              </Link>
              <Link href="/app/outgoing/create-manifest">
                <li
                  className={
                    router.pathname === "/app/outgoing/create-manifest" ? styles["list-active"] : styles["list"]
                  }
                >
                  Create Manifest
                </li>
              </Link>
              <Link href="/app/outgoing/create-surat-jalan">
                <li
                  className={
                    router.pathname === "/app/outgoing/create-surat-jalan" ? styles["list-active"] : styles["list"]
                  }
                >
                  Create Surat Jalan
                </li>
              </Link>
            </ul>
          )}
        </div>

        {/* --- Incoming Menu --- */}
        <div
          className={router.pathname.startsWith("/app/incoming") ? styles["menu-active"] : styles["menu-btn"]}
          onClick={incomingMenuHandler}
        >
          <div className={styles["menu-title"]}>
            <TruckIcon />
            <p className={styles["text-icon"]}>Incoming</p>
          </div>
          {incomingSubmenuIsValid && (
            <ul className={styles["menu-list"]}>
              <Link href="/app/incoming/receive-surat-jalan">
                <li
                  className={
                    router.pathname === "/app/incoming/receive-surat-jalan" ? styles["list-active"] : styles["list"]
                  }
                >
                  Receive Surat Jalan
                </li>
              </Link>
              <Link href="/app/incoming/receive-manifest">
                <li
                  className={
                    router.pathname === "/app/incoming/receive-manifest" ? styles["list-active"] : styles["list"]
                  }
                >
                  Receive Manifest
                </li>
              </Link>
              <Link href="/app/incoming/create-delivery">
                <li
                  className={
                    router.pathname === "/app/incoming/create-delivery" ? styles["list-active"] : styles["list"]
                  }
                >
                  Create Delivery
                </li>
              </Link>
            </ul>
          )}
        </div>

        {/* --- Reprint Menu --- */}
        <div
          className={router.pathname.startsWith("/app/reprint") ? styles["menu-active"] : styles["menu-btn"]}
          onClick={showReprintMenuHandler}
        >
          <div className={styles["menu-title"]}>
            <ReportIcon />
            <p className={styles["text-icon"]}>Reprint</p>
          </div>
          {reprintSubmenuIsValid ? (
            <ul className={styles["menu-list"]}>
              <Link href="/app/reprint/reprint-resi">
                <li
                  className={router.pathname === "/app/reprint/reprint-resi" ? styles["list-active"] : styles["list"]}
                >
                  Reprint Resi / Label
                </li>
              </Link>
              <li className={styles["list"]}>Reprint Manifest</li>
              <li className={styles["list"]}>Reprint Surat Jalan</li>
            </ul>
          ) : null}
        </div>
      </section>
    </nav>
  );
};

export default Sidemenu;
