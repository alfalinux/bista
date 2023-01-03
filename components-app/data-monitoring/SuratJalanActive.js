import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "./active.module.css";
import LoadingSpinner from "../../public/icons/loading-spinner";
import Button from "../../components-app/ui/Button";
import Search from "../../public/icons/search";
import suratjalanPdf from "../../helpers/suratjalanPdf";
import getDate from "../../helpers/getDate";

const SuratJalanActive = (props) => {
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const [listCabang, setListCabang] = useState([]);
  const [selectedCabang, setSelectedCabang] = useState("");
  const [manifestActive, setManifestActive] = useState([]);
  const [suratJalanActive, setSuratJalanActive] = useState([]);

  useEffect(() => {
    // Find All Cabang
    fetch("/api/cabang")
      .then((response) => response.json())
      .then((data) => {
        setListCabang(data);
      });
  }, [status]);

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
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
        setIsLoading(false);
      });
  }, [selectedCabang]);

  const selectCabangHandler = (e) => {
    setSelectedCabang(e.target.value);
  };

  return (
    <div className={styles["container"]}>
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
      <table className="table-container">
        <thead className="table-head">
          <tr>
            <td>No</td>
            <td>No Surat Jalan</td>
            <td>Tgl Surat Jalan</td>
            <td>Driver / Vendor</td>
            <td>Cabang Asal</td>
            <td>Cabang Tujuan</td>
            <td>Jlh Konsol</td>
            <td>Total Berat</td>
            <td>Jlh Manifest</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody className="table-body">
          {isLoading ? (
            <tr>
              <td colSpan="10">
                <LoadingSpinner />
              </td>
            </tr>
          ) : suratJalanActive.length === 0 ? (
            <tr>
              <td colSpan="10">Tidak Ada Data...</td>
            </tr>
          ) : (
            suratJalanActive.map((d, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td style={{ whiteSpace: "nowrap" }}>{d.noSuratJalan}</td>
                <td style={{ whiteSpace: "nowrap" }}>{getDate(d.tglSuratJalan)}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <div className={styles["table-driver"]}>
                    <span className={styles["table-driver__nama"]}>{d.namaDriver}</span>
                    <span className={styles["table-driver__nopol"]}>{d.nopolDriver}</span>
                  </div>
                </td>
                <td>{d.cabangAsal.toUpperCase()}</td>
                <td>{d.cabangTujuan.toUpperCase()}</td>
                <td>{d.konsolidasi} Koli</td>
                <td>{d.beratBarang} Kg</td>
                <td>{d.dataManifest.length} Manifest</td>
                <td>
                  <Button
                    label="Reprint Surat Jalan"
                    color="red"
                    icon={<Search />}
                    clickHandler={() => suratjalanPdf(d, manifestActive)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SuratJalanActive;
