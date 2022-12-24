import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import DashboardNav from "./ui/data-dashboard/DashboardNav";
import ResiActive from "./ui/data-dashboard/ResiActive";
import ManifestActive from "./ui/data-dashboard/ManifestActive";
import SuratJalanActive from "./ui/data-dashboard/SuratJalanActive";

const Dashboard = () => {
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [resiActive, setResiActive] = useState([]);
  const [manifestActive, setManifestActive] = useState([]);
  const [suratJalanActive, setSuratJalanActive] = useState([]);
  const [listCabang, setListCabang] = useState([]);
  const [selectedCabang, setSelectedCabang] = useState("");
  const [resiActiveSelected, setResiActiveSelected] = useState(false);
  const [manifestActiveSelected, setManifestActiveSelected] = useState(false);
  const [suratJalanActiveSelected, setSuratJalanActiveSelected] = useState(false);

  const resiActiveHandler = () => {
    setResiActiveSelected(true);
    setManifestActiveSelected(false);
    setSuratJalanActiveSelected(false);
  };
  const manifestActiveHandler = () => {
    setResiActiveSelected(false);
    setManifestActiveSelected(true);
    setSuratJalanActiveSelected(false);
  };
  const suratJalanActiveHandler = () => {
    setResiActiveSelected(false);
    setManifestActiveSelected(false);
    setSuratJalanActiveSelected(true);
  };

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

  useEffect(() => {
    setIsLoading(true);

    // find resi Active
    fetch("/api/data-resi/find-resi-aktif/" + selectedCabang)
      .then((response) => response.json())
      .then((data) => {
        !data
          ? null
          : setResiActive(
              data.sort((a, b) => {
                a.tglTransaksi - b.tglTransaksi;
                return -1;
              })
            );
      });

    // find manifest Active
    fetch("/api/data-manifest/belum-receive-asal/" + selectedCabang)
      .then((response) => response.json())
      .then((data) => {
        !data
          ? null
          : setManifestActive(
              data.sort((a, b) => {
                a.tglManifest - b.tglManifest;
                return -1;
              })
            );
      });

    // find Surat Jalan Active
    fetch("/api/data-surat-jalan/belum-receive-asal/" + selectedCabang)
      .then((response) => response.json())
      .then((data) => {
        !data
          ? null
          : setSuratJalanActive(
              data.sort((a, b) => {
                a.tglSuratJalan - b.tglSuratJalan;
                return -1;
              })
            );
      });

    setIsLoading(false);
  }, [selectedCabang]);

  return (
    <div className={styles["container"]}>
      <DashboardNav
        onResi={resiActiveHandler}
        onManifest={manifestActiveHandler}
        onSuratJalan={suratJalanActiveHandler}
        resiActiveSelected={resiActiveSelected}
        manifestActiveSelected={manifestActiveSelected}
        suratJalanActiveSelected={suratJalanActiveSelected}
      />
      <main className={styles["content"]}>
        {resiActiveSelected || manifestActiveSelected || suratJalanActiveSelected ? (
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
        ) : null}

        {!resiActiveSelected && !manifestActiveSelected && !suratJalanActiveSelected ? (
          <div className={styles["welcome-page"]}></div>
        ) : null}

        {resiActiveSelected ? <ResiActive dataResi={resiActive} /> : null}
        {manifestActiveSelected ? <ManifestActive dataManifest={manifestActive} /> : null}
        {suratJalanActiveSelected ? (
          <SuratJalanActive dataSuratJalan={suratJalanActive} dataManifest={manifestActive} />
        ) : null}
      </main>
    </div>
  );
};

export default Dashboard;
