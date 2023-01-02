import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { signOut } from "next-auth/react";

import styles from "./Sidemenu.module.css";
import HomeIcon from "../../public/icons/HomeIcon";
import TruckIcon from "../../public/icons/TruckIcon";
import RocketIcon from "../../public/icons/RocketIcon";
import ReportIcon from "../../public/icons/ReportIcon";
import PlaneIcon from "../../public/icons/plane-icon";
import Setting from "../../public/icons/setting";
import Printer from "../../public/icons/printer";

const Sidemenu = (props) => {
  const [monitoringSubmenu, setMonitoringSubmenu] = useState(false);
  const [outgoingSubmenu, setOutgoingSubmenu] = useState(false);
  const [incomingSubmenu, setIncomingSubmenu] = useState(false);
  const [reprintSubmenu, setReprintSubmenu] = useState(false);
  const [deliverySubmenu, setDeliverySubmenu] = useState(false);
  const [profileSubmenu, setProfileSubmenu] = useState(false);

  const showMobileMenu = props.style;
  const router = useRouter();

  const onLogoutHandler = () => {
    Swal.fire({
      title: "Logout",
      text: "Apakah Anda mau keluar dari aplikasi?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "limegreen",
      confirmButtonText: "Ya, keluar",
      cancelButtonColor: "crimson",
      cancelButtonText: "Tidak jadi",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut({ redirect: false });
        Swal.fire({
          title: "Berhasil",
          text: "Anda sudah keluar dari aplikasi",
          icon: "success",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            window.location.reload();
          }
        });
      }
    });
  };

  const monitoringMenuHandler = () => {
    setMonitoringSubmenu(monitoringSubmenu ? false : true);
  };

  const outgoingMenuHandler = () => {
    setOutgoingSubmenu(outgoingSubmenu ? false : true);
  };

  const incomingMenuHandler = () => {
    setIncomingSubmenu(incomingSubmenu ? false : true);
  };

  const reprintMenuHandler = (e) => {
    setReprintSubmenu(reprintSubmenu ? false : true);
  };

  const deliveryMenuHandler = (e) => {
    setDeliverySubmenu(deliverySubmenu ? false : true);
  };

  const profileMenuHandler = (e) => {
    setProfileSubmenu(profileSubmenu ? false : true);
  };

  const monitoringSubmenuIsValid = monitoringSubmenu || router.pathname.startsWith("/app/monitoring");
  const outgoingSubmenuIsValid = outgoingSubmenu || router.pathname.startsWith("/app/outgoing");
  const incomingSubmenuIsValid = incomingSubmenu || router.pathname.startsWith("/app/incoming");
  const deliverySubmenuIsValid = deliverySubmenu || router.pathname.startsWith("/app/delivery");
  const reprintSubmenuIsValid = reprintSubmenu || router.pathname.startsWith("/app/reprint");
  const profileSubmenuIsValid = profileSubmenu || router.pathname.startsWith("/app/profile");

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

        {/* --- Monitoring Menu */}
        <div
          className={router.pathname.startsWith("/app/monitoring") ? styles["menu-active"] : styles["menu-btn"]}
          onClick={monitoringMenuHandler}
        >
          <div className={styles["menu-title"]}>
            <ReportIcon />
            <p className={styles["text-icon"]}>Monitoring</p>
          </div>
          {monitoringSubmenuIsValid && (
            <ul className={styles["menu-list"]}>
              <Link href="/app/monitoring/resi-active">
                <li
                  className={router.pathname === "/app/monitoring/resi-active" ? styles["list-active"] : styles["list"]}
                >
                  Resi Aktif
                </li>
              </Link>
              <Link href="/app/monitoring/manifest-active">
                <li
                  className={
                    router.pathname === "/app/monitoring/manifest-active" ? styles["list-active"] : styles["list"]
                  }
                >
                  Manifest Aktif
                </li>
              </Link>
              <Link href="/app/monitoring/surat-jalan-active">
                <li
                  className={
                    router.pathname === "/app/monitoring/surat-jalan-active" ? styles["list-active"] : styles["list"]
                  }
                >
                  Surat Jalan Aktif
                </li>
              </Link>
            </ul>
          )}
        </div>

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
            </ul>
          )}
        </div>

        {/* --- Delivery Menu --- */}
        <div
          className={router.pathname.startsWith("/app/delivery") ? styles["menu-active"] : styles["menu-btn"]}
          onClick={deliveryMenuHandler}
        >
          <div className={styles["menu-title"]}>
            <PlaneIcon />
            <p className={styles["text-icon"]}>Delivery</p>
          </div>
          {deliverySubmenuIsValid && (
            <ul className={styles["menu-list"]}>
              <Link href="/app/delivery/create-delivery">
                <li
                  className={
                    router.pathname === "/app/delivery/create-delivery" ? styles["list-active"] : styles["list"]
                  }
                >
                  Create Delivery
                </li>
              </Link>
              <Link href="/app/delivery/update-status-delivery">
                <li
                  className={
                    router.pathname === "/app/delivery/update-status-delivery" ? styles["list-active"] : styles["list"]
                  }
                >
                  Update Status Delivery
                </li>
              </Link>
            </ul>
          )}
        </div>

        {/* --- Reprint Menu --- */}
        <div
          className={router.pathname.startsWith("/app/reprint") ? styles["menu-active"] : styles["menu-btn"]}
          onClick={reprintMenuHandler}
        >
          <div className={styles["menu-title"]}>
            <Printer />
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
              <Link href="/app/reprint/reprint-manifest">
                <li
                  className={
                    router.pathname === "/app/reprint/reprint-manifest" ? styles["list-active"] : styles["list"]
                  }
                >
                  Reprint Manifest
                </li>
              </Link>

              <Link href="/app/reprint/reprint-surat-jalan">
                <li
                  className={
                    router.pathname === "/app/reprint/reprint-surat-jalan" ? styles["list-active"] : styles["list"]
                  }
                >
                  Reprint Surat Jalan
                </li>
              </Link>

              <Link href="/app/reprint/reprint-delivery">
                <li
                  className={
                    router.pathname === "/app/reprint/reprint-delivery" ? styles["list-active"] : styles["list"]
                  }
                >
                  Reprint Delivery
                </li>
              </Link>
            </ul>
          ) : null}
        </div>

        {/* --- Profile Menu --- */}
        <div
          className={router.pathname.startsWith("/app/profile") ? styles["menu-active"] : styles["menu-btn"]}
          onClick={profileMenuHandler}
        >
          <div className={styles["menu-title"]}>
            <Setting />
            <p className={styles["text-icon"]}>Profile</p>
          </div>
          {profileSubmenuIsValid ? (
            <ul className={styles["menu-list"]}>
              <Link href="/app/profile/change-password">
                <li
                  className={
                    router.pathname === "/app/profile/change-password" ? styles["list-active"] : styles["list"]
                  }
                >
                  Ganti Password
                </li>
              </Link>

              <li className={styles["list"]} onClick={onLogoutHandler}>
                Logout
              </li>
            </ul>
          ) : null}
        </div>
      </section>
    </nav>
  );
};

export default Sidemenu;
