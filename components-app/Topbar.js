import UserIcon from "../public/icons/UserIcon";
import Bars from "../public/icons/bars";
import styles from "./Topbar.module.css";
import CloseCircle from "../public/icons/close-circle";

const Topbar = (props) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["hamburger-icon"]} onClick={props.onToggle}>
        {props.onShow ? <CloseCircle /> : <Bars />}
      </div>
      <UserIcon />
      <div className={styles["user-detail"]}>
        <h5 className={styles["user-id"]}>{props.user.nama}</h5>
        <p className={styles["user-email"]}>
          {props.user.cabang} - {props.user.posisi}
        </p>
      </div>
    </div>
  );
};

export default Topbar;
