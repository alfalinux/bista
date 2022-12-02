import styles from "../../styles/Layouts.module.css";

import Sidemenu from "../../components-app/Sidemenu";
import Topbar from "../../components-app/Topbar";
import { useState } from "react";

const Layouts = (props) => {
  const [showSideMenu, setShowSideMenu] = useState(false);

  const showSideMenuHandler = () => {
    setShowSideMenu(!showSideMenu);
  };

  return (
    <div className={styles["container"]}>
      <Sidemenu style={showSideMenu} />
      <div className={styles["main-side"]}>
        <Topbar onToggle={showSideMenuHandler} onShow={showSideMenu} />
        {props.children}
      </div>
    </div>
  );
};

export default Layouts;
