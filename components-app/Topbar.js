import { useState } from "react";
import { signOut } from "next-auth/react";
import styles from "./Topbar.module.css";
import UserIcon from "../public/icons/UserIcon";
import Bars from "../public/icons/bars";
import CloseCircle from "../public/icons/close-circle";
import Swal from "sweetalert2";

const Topbar = (props) => {
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
        signOut();
        Swal.fire({
          title: "Berhasil",
          text: "Anda sudah keluar dari aplikasi",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["hamburger-icon"]} onClick={props.onToggle}>
        {props.onShow ? <CloseCircle /> : <Bars />}
      </div>
      <div onClick={onLogoutHandler} className={styles["user-icon"]}>
        <UserIcon />
      </div>
      <div className={styles["user-detail"]}>
        <h5 className={styles["user-id"]}>{props.user.nama}</h5>
        <p className={styles["user-email"]}>{props.user.email}</p>
      </div>
    </div>
  );
};

export default Topbar;
