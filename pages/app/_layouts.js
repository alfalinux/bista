import styles from "../../styles/Layouts.module.css";

import SidemenuGeneral from "../../components-app/sidemenu/SidemenuGeneral";
import SidemenuKurir from "../../components-app/sidemenu/SidemenuKurir";
import SidemenuAdmin from "../../components-app/sidemenu/SidemenuAdmin";
import Topbar from "../../components-app/Topbar";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Layouts = (props) => {
  const router = useRouter();
  const { data, status } = useSession();
  const [showSideMenu, setShowSideMenu] = useState(false);

  const showSideMenuHandler = () => {
    setShowSideMenu(!showSideMenu);
  };

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/auth");
    }
  }, [router]);
  return (
    <>
      {status !== "authenticated" ? null : (
        <div className={styles["container"]}>
          {data.posisi === "GEN" ? (
            <SidemenuGeneral style={showSideMenu} />
          ) : data.posisi === "KUR" ? (
            <SidemenuKurir style={showSideMenu} />
          ) : data.posisi === "ADM" ? (
            <SidemenuAdmin style={showSideMenu} />
          ) : data.posisi === "SPV" ? (
            <SidemenuAdmin style={showSideMenu} />
          ) : data.posisi === "MGR" ? (
            <SidemenuAdmin style={showSideMenu} />
          ) : data.posisi === "CSO" ? (
            <SidemenuAdmin style={showSideMenu} />
          ) : null}
          <div className={styles["main-side"]}>
            <Topbar onToggle={showSideMenuHandler} onShow={showSideMenu} user={data} />
            {props.children}
          </div>
        </div>
      )}
    </>
  );
};

export default Layouts;
