import styles from "./DashboardNav.module.css";

const DashboardNav = (props) => {
  return (
    <header className={styles["head-nav"]}>
      <div className={props.resiActiveSelected ? styles["menu-nav-active"] : styles["menu-nav"]} onClick={props.onResi}>
        Resi Aktif
      </div>
      <div
        className={props.manifestActiveSelected ? styles["menu-nav-active"] : styles["menu-nav"]}
        onClick={props.onManifest}
      >
        Manifest Aktif
      </div>
      <div
        className={props.suratJalanActiveSelected ? styles["menu-nav-active"] : styles["menu-nav"]}
        onClick={props.onSuratJalan}
      >
        Surat Jalan Aktif
      </div>
    </header>
  );
};

export default DashboardNav;
