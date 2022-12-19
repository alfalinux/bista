import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import ResiActive from "./ui/data-dashboard/ResiActive";

const Dashboard = () => {
  const { data, status } = useSession();
  const [listCabang, setListCabang] = useState([]);
  const [selectedCabang, setSelectedCabang] = useState("");

  const selectCabangHandler = (e) => {
    setSelectedCabang(e.target.value);
  };

  useEffect(() => {
    fetch("/api/cabang")
      .then((response) => response.json())
      .then((data) => {
        setListCabang(data);
      });
  }, [status]);

  return (
    <div className={styles["container"]}>
      <header className={styles["head-nav"]}>
        <div className={styles["menu-nav"]}>Resi Aktif</div>
        <div className={styles["menu-nav"]}>Resi Belum Manifest</div>
        <div className={styles["menu-nav"]}>Resi Belum Surat Jalan</div>
      </header>

      <main className={styles["content"]}>
        <div className={styles["cabang-option"]}>
          <label htmlFor="cabang">Cabang</label>
          <select name="cabang" id="cabang" value={selectedCabang} onChange={selectCabangHandler}>
            <option value="" disabled={true}>
              --Pilih Cabang--
            </option>
            {!data ? null : data.posisi === "GEN" ? (
              listCabang.map((d, i) => (
                <option key={i} value={d.cab}>
                  {d.cab.toUpperCase()}
                </option>
              ))
            ) : (
              <option value={data.cabangDesc}>{data.cabangDesc.toUpperCase()}</option>
            )}
          </select>
        </div>

        <ResiActive cabang={selectedCabang} />
      </main>
    </div>
  );
};

export default Dashboard;
