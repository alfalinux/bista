import styles from "./Member.module.css";

const Member = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["darker"]}></div>
      <div className={styles["title"]}>
        <h2>MEMBER</h2>
        <p>Yang sudah menggunakan jasa Bista Cargo</p>
      </div>
      <div className={styles["img-show"]}>
        <img src="/images/arbatel.png" alt="logo arbatel" height="72px" width="auto" />
        <img src="/images/biru.png" alt="logo biru" height="72px" width="auto" />
        <img src="/images/mtj-logistik.png" alt="logo mtj logistik" height="72px" width="auto" />
        <img src="/images/pari-cargo.png" alt="logo pari cargo" height="72px" width="auto" />
        <img src="/images/shp.png" alt="logo shp logistik" height="72px" width="auto" />
        <img
          src="/images/sigap-logistics.jpeg"
          alt="logo sigap logistik"
          height="64px"
          width="auto"
        />
      </div>
    </div>
  );
};

export default Member;
