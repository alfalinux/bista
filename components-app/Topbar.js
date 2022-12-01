import UserIcon from "../public/icons/UserIcon";
import styles from "./Topbar.module.css";

const Topbar = () => {
  return (
    <div className={styles["container"]}>
      <UserIcon />
      <div className={styles["user-detail"]}>
        <h5 className={styles["user-id"]}>Alfahmi BM BKU</h5>
        <p className={styles["user-email"]}>alfahmi@gmial.com</p>
      </div>
    </div>
  );
};

export default Topbar;
