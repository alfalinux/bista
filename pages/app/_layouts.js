import styles from "../../styles/Layouts.module.css";

import Sidemenu from "../../components-app/Sidemenu";
import Topbar from "../../components-app/Topbar";

const Layouts = (props) => {
  return (
    <div className={styles["container"]}>
      <Sidemenu />
      <div className={styles["main-side"]}>
        <Topbar />
        {props.children}
      </div>
    </div>
  );
};

export default Layouts;
