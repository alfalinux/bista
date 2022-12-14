import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import styles from "./UpdateStatusDelivery.module.css";
import LoadingPage from "./ui/LoadingPage";
import LoadingSpinner from "../public/icons/loading-spinner";
import Button from "../components-app/ui/Button";
import Check from "../public/icons/check";
import CloseCircle from "../public/icons/close-circle";
import Stack from "../public/icons/stack";
import Refresh from "../public/icons/refresh";
import ModalUpdateDelivery from "../components-app/ui/ModalUpdateDelivery";

const CreateDelivery = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data, status } = useSession();
  const [listCabang, setListCabang] = useState([]);

  const [cabangTujuan, setCabangTujuan] = useState("");
  const [namaKurir, setNamaKurir] = useState("");
  const [listDelivery, setListDelivery] = useState([]);
  const [listKurir, setListKurir] = useState([]);

  const [showModalUpdate, setShowModalUpdate] = useState(false);

  useEffect(() => {
    const checkbox = document.querySelectorAll("#checkbox");
    for (let item of checkbox) {
      item.checked = false;
    }
  }, [cabangTujuan]);

  useEffect(() => {
    fetch("/api/cabang")
      .then((response) => response.json())
      .then((data) => setListCabang(data));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (namaKurir) {
      fetch("/api/data-delivery/proses/" + namaKurir)
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          setListDelivery(data);
        });
    } else {
      setIsLoading(false);
    }
  }, [cabangTujuan, namaKurir]);

  useEffect(() => {
    setIsLoading(true);
    if (cabangTujuan) {
      fetch("/api/data-resi/belum-update-status/" + cabangTujuan)
        .then((response) => response.json())
        .then((data) => {
          setListKurir([...new Set(...data.map((d) => d.delivery.map((a) => a.namaKurir)))]);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [cabangTujuan]);

  const cabangTujuanChangeHandler = (e) => {
    setCabangTujuan(e.target.value);
    setNamaKurir("");
  };

  const kurirChangeHandler = (e) => {
    setNamaKurir(e.target.value);
  };

  const onUpdateHandler = () => {
    setShowModalUpdate(!showModalUpdate);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoadingPage(true);
    const tgl = new Date().toLocaleString("en-UK", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setIsLoadingPage(false);
  };

  return (
    <div className={styles["container"]}>
      {isLoadingPage ? <LoadingPage /> : null}

      {/* -- Display Form Selection -- */}
      {status === "authenticated" ? (
        <form className={styles["form-wrapper"]}>
          <div className={styles["field"]}>
            <label className={styles["label"]} htmlFor="cabang">
              Cabang
            </label>
            <select name="cabang" id="cabang" defaultValue="" onChange={cabangTujuanChangeHandler}>
              <option value="" disabled>
                -- Pilih Cabang --
              </option>
              {data.posisi === "GEN"
                ? listCabang.map((d, i) => (
                    <option key={i} value={d.cab}>
                      {d.cab.toUpperCase()}
                    </option>
                  ))
                : listCabang
                    .filter((d) => d.tlc === data.cabang)
                    .map((d, i) => (
                      <option key={i} value={d.cab}>
                        {d.cab.toUpperCase()}
                      </option>
                    ))}
            </select>
          </div>

          <div className={styles["field"]}>
            <label className={styles["label"]} htmlFor="kurir">
              Kurir
            </label>
            <select name="kurir" id="kurir" defaultValue="" onChange={kurirChangeHandler}>
              <option value="">-- Pilih Kurir --</option>
              {listKurir.length > 0
                ? listKurir.map((d, i) => (
                    <option key={i} value={d}>
                      {d.toUpperCase()}
                    </option>
                  ))
                : null}
            </select>
          </div>
        </form>
      ) : (
        <LoadingPage />
      )}

      {/* --Display Tabel Options -- */}
      {isLoading ? (
        <div className="center-loading">
          <LoadingSpinner />
        </div>
      ) : namaKurir ? (
        listDelivery.map((d, i) => (
          <>
            <div className={styles["table-title"]} key={i}>
              <span className={styles["table-title__icon"]}>
                <Stack />
              </span>
              <span className={styles["table-title__text"]}>{d.noDelivery}</span>
              <span className={styles["table-title__date"]}>{d.tglDelivery}</span>
            </div>
            <table className="table-container">
              <thead className="table-head">
                <tr>
                  <td>No</td>
                  <td>No Resi</td>
                  <td>Penerima</td>
                  <td>Isi Paket</td>
                  <td>Jlh Paket</td>
                  <td>Berat Paket</td>
                  <td style={{ width: "100px" }}>Status</td>
                </tr>
              </thead>
              <tbody className="table-body">
                {d.dataResi.map((val, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{val.noResi}</td>
                    <td>
                      <div className={styles["table-penerima"]}>
                        <span className={styles["table-penerima__nama"]}>{val.namaPenerima}</span>
                        <span className={styles["table-penerima__nohp"]}>{val.nohpPenerima}</span>
                        <span className={styles["table-penerima__alamat"]}>{val.alamatPenerima}</span>
                      </div>
                    </td>
                    <td>{val.keteranganBarang}</td>
                    <td>{val.jumlahBarang} Koli</td>
                    <td>{val.jumlahBarang} Kg</td>
                    <td>
                      {val.statusDelivery === "proses" && (
                        <Button
                          type="submit"
                          label="Pengantaran"
                          color="orange"
                          width="full"
                          icon={<Refresh />}
                          clickHandler={onUpdateHandler}
                        />
                      )}
                      {val.statusDelivery === "diterima" && (
                        <Button
                          type="submit"
                          label="Diterima"
                          color="cornflowerblue"
                          width="full"
                          icon={<Check />}
                          clickHandler={onUpdateHandler}
                        />
                      )}
                      {val.statusDelivery === "gagal" && (
                        <Button
                          type="submit"
                          label="Diterima"
                          color="red"
                          width="full"
                          icon={<CloseCircle />}
                          clickHandler={onUpdateHandler}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showModalUpdate ? <ModalUpdateDelivery onCloseModal={onUpdateHandler} /> : null}
          </>
        ))
      ) : null}
    </div>
  );
};

export default CreateDelivery;
