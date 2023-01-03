import { useState, useEffect } from "react";
import styles from "./active.module.css";
import LoadingSpinner from "../../public/icons/loading-spinner";
import LoadingPage from "../ui/LoadingPage";
import Button from "../ui/Button";
import Search from "../../public/icons/search";
import ModalDetailResi from "./ModalDetailResi";
import { useSession } from "next-auth/react";
import getDate from "../../helpers/getDate";

const ResiActive = (props) => {
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [showModalDetailResi, setShowModalDetailResi] = useState(false);

  const [listCabang, setListCabang] = useState([]);
  const [selectedCabang, setSelectedCabang] = useState("");
  const [resiActive, setResiActive] = useState([]);
  const [dataResi, setDataResi] = useState({});

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
        setIsLoading(false);
      });
  }, [selectedCabang]);

  const selectCabangHandler = (e) => {
    setSelectedCabang(e.target.value);
  };

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
          {isLoading ? (
            <tr>
              <td colSpan="11">
                <LoadingSpinner />
              </td>
            </tr>
          ) : resiActive.length === 0 ? (
            <tr>
              <td colSpan="11">Tidak Ada Data...</td>
            </tr>
          ) : (
            resiActive.map((d, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <div className={styles["table-resi"]}>
                    <span className={styles["table-resi__noResi"]}>{d.noResi}</span>
                    <span className={styles["table-resi__tgl"]}>{getDate(d.tglTransaksi)}</span>
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
                      <span className={styles["table-status__settle"]}>Settle</span>
                    )}
                    {countDayLeft(d.dataOngkir.slaCargo, d.tglTransaksi) < 0 && (
                      <span className={styles["table-status__overdue"]}>Overdue</span>
                    )}
                    {countDayLeft(d.dataOngkir.slaCargo, d.tglTransaksi) === 1 && (
                      <span className={styles["table-status__warning"]}>Warning</span>
                    )}
                    {countDayLeft(d.dataOngkir.slaCargo, d.tglTransaksi) === 0 && (
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
    </div>
  );
};

export default ResiActive;
