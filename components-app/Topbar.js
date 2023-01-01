import { signOut } from "next-auth/react";
import styles from "./Topbar.module.css";
import UserIcon from "../public/icons/UserIcon";
import Bars from "../public/icons/bars";
import CloseCircle from "../public/icons/close-circle";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Topbar = (props) => {
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
          showConfirmButton: false,
          timer: 2000,
        }).then((result) => {
          if (result.isDismissed) {
            router.replace("/auth");
          }
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
