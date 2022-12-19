import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import styles from "./ResiActive.module.css";
import LoadingSpinner from "../../../public/icons/loading-spinner";

const ResiActive = () => {
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [resiActive, setResiActive] = useState([]);
  const [selectedCabang, setSelectedCabang] = useState("");

  useEffect(() => {
    if (data) {
      setSelectedCabang(data.cabangDesc);
    }
  }, [data]);
  console.log(selectedCabang);
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/data-resi/find-resi-aktif/" + selectedCabang)
      .then((response) => response.json())
      .then((data) => {
        setResiActive(data);
        setIsLoading(false);
      });
  }, [selectedCabang]);

  return (
    <table className="table-container">
      <thead className="table-head">
        <tr>
          <td>No</td>
          <td>No Resi</td>
          <td>Pengirim</td>
          <td>Penerima</td>
          <td>Isi Paket</td>
          <td>Jlh Paket</td>
          <td>Berat Paket</td>
          <td>Layanan</td>
          <td>Pembayaran</td>
          <td>Status</td>
        </tr>
      </thead>
      <tbody className="table-body">
        {!resiActive ? null : isLoading ? (
          <tr>
            <td colSpan={10}>
              <LoadingSpinner />
            </td>
          </tr>
        ) : (
          resiActive.map((d, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{d.noResi}</td>
              <td>
                <div className={styles["table-penerima"]}>
                  <span className={styles["table-penerima__nama"]}>{d.namaPengirim}</span>
                  <span className={styles["table-penerima__nohp"]}>{d.nohpPengirim}</span>
                  <span className={styles["table-penerima__alamat"]}>{d.alamatPengirim}</span>
                </div>
              </td>
              <td>
                <div className={styles["table-penerima"]}>
                  <span className={styles["table-penerima__nama"]}>{d.namaPenerima}</span>
                  <span className={styles["table-penerima__nohp"]}>{d.nohpPenerima}</span>
                  <span className={styles["table-penerima__alamat"]}>{d.alamatPenerima}</span>
                </div>
              </td>
              <td>{d.keteranganBarang}</td>
              <td>{d.jumlahBarang} Koli</td>
              <td>{d.beratBarang} Kg</td>
              <td>{d.layanan.toUpperCase()}</td>
              <td>
                <div className={styles["table-pembayaran"]}>
                  <span className={styles["table-pembayaran__option"]}>{d.pembayaran.toUpperCase()}</span>
                  <span className={styles["table-pembayaran__total"]}>
                    Rp. {Number(d.grandTotal).toLocaleString("id-ID")} ,-
                  </span>
                </div>
              </td>
              <td>Status</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ResiActive;
