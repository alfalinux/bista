import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "./active.module.css";
import LoadingSpinner from "../../public/icons/loading-spinner";
import Button from "../../components-app/ui/Button";
import Search from "../../public/icons/search";
import manifestPdf from "../../helpers/manifestPdf";
import getDate from "../../helpers/getDate";

const ManifestActive = (props) => {
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const [listCabang, setListCabang] = useState([]);
  const [selectedCabang, setSelectedCabang] = useState("");
  const [manifestActive, setManifestActive] = useState([]);

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
            <td>No Manifest</td>
            <td>Tgl Manifest</td>
            <td>Cabang Asal</td>
            <td>Cabang Tujuan</td>
            <td>Coveran Area</td>
            <td>Jlh Konsol</td>
            <td>Total Berat</td>
            <td>Jlh Resi</td>
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
          ) : manifestActive.length === 0 ? (
            <tr>
              <td colSpan="10">Tidak Ada Data...</td>
            </tr>
          ) : (
            manifestActive.map((d, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td style={{ whiteSpace: "nowrap" }}>{d.noManifest}</td>
                <td style={{ whiteSpace: "nowrap" }}>{getDate(d.tglManifest)}</td>
                <td>{d.cabangAsal.toUpperCase()}</td>
                <td>{d.cabangTujuan.toUpperCase()}</td>
                <td>{d.coveranArea.toUpperCase()}</td>
                <td>{d.konsolidasi} Koli</td>
                <td>{d.jumlahBerat} Kg</td>
                <td>{d.dataResi.length} Resi</td>
                <td>
                  <Button label="Reprint Manifest" color="red" icon={<Search />} clickHandler={() => manifestPdf(d)} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManifestActive;
