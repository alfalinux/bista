import styles from "../../styles/Layouts.module.css";

import SidemenuGeneral from "../../components-app/sidemenu/SidemenuGeneral";
import SidemenuKurir from "../../components-app/sidemenu/SidemenuKurir";
import SidemenuAdmin from "../../components-app/sidemenu/SidemenuAdmin";
import Topbar from "../../components-app/Topbar";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingComponent from "../../components-app/ui/LoadingComponent";

const Layouts = (props) => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [profile, setProfile] = useState("");
  const router = useRouter();

  const showSideMenuHandler = () => {
    setShowSideMenu(!showSideMenu);
  };

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/auth");
      } else {
        setProfile(session);
        setLoadingPage(false);
      }
    });
  }, [router]);
  return (
    <div className={styles["container"]}>
      {profile.posisi === "GEN" ? <SidemenuGeneral style={showSideMenu} /> : null}
      {profile.posisi === "KUR" ? <SidemenuKurir style={showSideMenu} /> : null}
      {profile.posisi === "ADM" ? <SidemenuAdmin style={showSideMenu} /> : null}
      {profile.posisi === "SPV" ? <SidemenuAdmin style={showSideMenu} /> : null}
      {profile.posisi === "MGR" ? <SidemenuAdmin style={showSideMenu} /> : null}
      {profile.posisi === "CSO" ? <SidemenuAdmin style={showSideMenu} /> : null}

      <div className={styles["main-side"]}>
        <Topbar onToggle={showSideMenuHandler} onShow={showSideMenu} user={profile} />
        {loadingPage ? <LoadingComponent /> : props.children}
      </div>
    </div>
  );
};

export default Layouts;
