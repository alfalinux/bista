import { useState } from "react";
import styles from "./ManifestActive.module.css";
import LoadingSpinner from "../../../public/icons/loading-spinner";
import LoadingPage from "../LoadingPage";
import Button from "../Button";
import Search from "../../../public/icons/search";
import ModalDetailResi from "./ModalDetailResi";
import manifestPdf from "../../../helpers/manifestPdf";

const ManifestActive = (props) => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [showModalDetailResi, setShowModalDetailResi] = useState(false);
  const [dataManifest, setDataManifest] = useState([]);

  const closeModalDetailResi = () => {
    setShowModalDetailResi(false);
    setDataManifest([]);
  };

  return (
    <>
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
          {props.dataManifest.length === 0 ? (
            <tr>
              <td colSpan="10">Tidak Ada Data...</td>
            </tr>
          ) : (
            props.dataManifest.map((d, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td style={{ whiteSpace: "nowrap" }}>{d.noManifest}</td>
                <td style={{ whiteSpace: "nowrap" }}>{d.tglManifest}</td>
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
      {isLoadingPage ? <LoadingPage /> : null}
      {showModalDetailResi ? <ModalDetailResi dataManifest={dataManifest} onClose={closeModalDetailResi} /> : null}
    </>
  );
};

export default ManifestActive;
