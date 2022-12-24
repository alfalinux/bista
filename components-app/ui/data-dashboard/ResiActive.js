import { useState } from "react";
import styles from "./ResiActive.module.css";
import LoadingSpinner from "../../../public/icons/loading-spinner";
import LoadingPage from "../LoadingPage";
import Button from "../Button";
import Search from "../../../public/icons/search";
import ModalDetailResi from "./ModalDetailResi";

const ResiActive = (props) => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [showModalDetailResi, setShowModalDetailResi] = useState(false);

  const [dataResi, setDataResi] = useState({});

  const detailClickHandler = (noResi) => {
    setIsLoadingPage(true);
    fetch("/api/data-resi/cek-resi/" + noResi)
      .then((response) => response.json())
      .then((data) => {
        setDataResi(data);
        setShowModalDetailResi(true);
        setIsLoadingPage(false);
      });
  };

  const closeModalDetailResi = () => {
    setShowModalDetailResi(false);
    setDataResi({});
  };

  const countDayLeft = (sla, tglTransaksi) => {
    return sla - (new Date().setHours(0, 0, 0, 1) - new Date(tglTransaksi).setHours(0, 0, 0, 1)) / 86400000;
  };

  return (
    <>
      <table className="table-container">
        <thead className="table-head">
          <tr>
            <td>No</td>
            <td>No Resi</td>
            <td>Pengirim</td>
            <td>Penerima</td>
            <td>Jlh Paket</td>
            <td>Berat Paket</td>
            <td>Layanan</td>
            <td>Pembayaran</td>
            <td>SLA</td>
            <td>Status</td>
            <td>Tracking</td>
          </tr>
        </thead>
        <tbody className="table-body">
          {props.dataResi.length === 0 ? (
            <tr>
              <td colSpan="11">Tidak Ada Data...</td>
            </tr>
          ) : (
            props.dataResi.map((d, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <div className={styles["table-resi"]}>
                    <span className={styles["table-resi__noResi"]}>{d.noResi}</span>
                    <span className={styles["table-resi__tgl"]}>{d.tglTransaksi}</span>
                  </div>
                </td>
                <td>
                  <div className={styles["table-penerima"]}>
                    <span className={styles["table-penerima__nama"]}>{d.namaPengirim}</span>
                    <span className={styles["table-penerima__alamat"]}>{d.cabangAsal.toUpperCase()}</span>
                  </div>
                </td>
                <td>
                  <div className={styles["table-penerima"]}>
                    <span className={styles["table-penerima__nama"]}>{d.namaPenerima}</span>
                    <span className={styles["table-penerima__alamat"]}>
                      {d.tujuan.kec}, {d.tujuan.kabkot}
                    </span>
                  </div>
                </td>
                <td>{d.jumlahBarang} Koli</td>
                <td>{d.beratBarang} Kg</td>
                <td>{d.layanan.toUpperCase()}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <div className={styles["table-pembayaran"]}>
                    <span className={styles["table-pembayaran__option"]}>{d.pembayaran.toUpperCase()}</span>
                    <span className={styles["table-pembayaran__total"]}>
                      Rp. {Number(d.grandTotal).toLocaleString("id-ID")}
                    </span>
                  </div>
                </td>
                <td>
                  {d.layanan === "cargo"
                    ? Number(d.dataOngkir.slaCargo) - 1 + "-" + d.dataOngkir.slaCargo + " Hari"
                    : ""}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <div className={styles["table-status"]}>
                    {countDayLeft(d.dataOngkir.slaCargo, d.tglTransaksi) > 1 && (
                      <span className={styles["table-status__settle"]}>On Schedule</span>
                    )}
                    {countDayLeft(d.dataOngkir.slaCargo, d.tglTransaksi) < 0 && (
                      <span className={styles["table-status__overdue"]}>Overdue</span>
                    )}
                    {countDayLeft(d.dataOngkir.slaCargo, d.tglTransaksi) <= 1 && (
                      <span className={styles["table-status__warning"]}>Warning</span>
                    )}

                    <span className={styles["table-status__date"]}>
                      {countDayLeft(d.dataOngkir.slaCargo, d.tglTransaksi) * -1} Hari
                    </span>
                  </div>
                </td>
                <td>
                  <Button
                    label="Detail"
                    color="cornflowerblue"
                    icon={<Search />}
                    clickHandler={() => detailClickHandler(d.noResi)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {isLoadingPage ? <LoadingPage /> : null}
      {showModalDetailResi ? <ModalDetailResi dataResi={dataResi} onClose={closeModalDetailResi} /> : null}
    </>
  );
};

export default ResiActive;
