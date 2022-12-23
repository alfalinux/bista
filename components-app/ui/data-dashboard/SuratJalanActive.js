import { useState } from "react";
import styles from "./SuratJalanActive.module.css";
import LoadingSpinner from "../../../public/icons/loading-spinner";
import LoadingPage from "../LoadingPage";
import Button from "../Button";
import Search from "../../../public/icons/search";
import ModalDetailResi from "./ModalDetailResi";
import suratjalanPdf from "../../../helpers/suratjalanPdf";

const SuratJalanActive = (props) => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  return (
    <>
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
          {props.dataSuratJalan.length === 0 ? (
            <tr>
              <td colSpan="10">Tidak Ada Data...</td>
            </tr>
          ) : (
            props.dataSuratJalan.map((d, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td style={{ whiteSpace: "nowrap" }}>{d.noSuratJalan}</td>
                <td style={{ whiteSpace: "nowrap" }}>{d.tglSuratJalan}</td>
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
                    clickHandler={() => suratjalanPdf(d, props.dataManifest)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {isLoadingPage ? <LoadingPage /> : null}
    </>
  );
};

export default SuratJalanActive;
