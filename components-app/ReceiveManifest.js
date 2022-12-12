import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getDate from "../helpers/getDate";

import styles from "./ReceiveManifest.module.css";
import Button from "./ui/Button";
import LoadingSpinner from "../public/icons/loading-spinner";
import Check from "../public/icons/check";

const ReceiveManifest = () => {
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [listCabang, setListCabang] = useState([]);

  const [cabangTujuan, setCabangTujuan] = useState("");
  const [fetchDataManifest, setFetchDataManifest] = useState([]);
  const [manifestChecked, setManifestChecked] = useState({});

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }
    fetch("/api/cabang")
      .then((response) => response.json())
      .then((data) => setListCabang(data));

    if (data.posisi !== "GEN") {
      setCabangTujuan(data.cabang);
    }
  }, [status]);

  useEffect(() => {
    setIsLoading(true);
    if (!cabangTujuan) {
      setIsLoading(false);
      return;
    }
    fetch("/api/data-manifest/belum-receive/" + cabangTujuan)
      .then((response) => response.json())
      .then((data) => {
        setFetchDataManifest(data);
        setIsLoading(false);
      });
  }, [cabangTujuan]);

  useEffect(() => {
    const checkbox = document.querySelectorAll("#checkbox");
    for (let item of checkbox) {
      item.checked = false;
    }
  }, [cabangTujuan]);

  const cabangTujuanChangeHandler = (e) => {
    setIsLoading(true);
    setCabangTujuan(e.target.value);
    setManifestChecked({});
    setIsLoading(false);
  };

  const checkboxChangeHandler = (e, checked) => {
    setManifestChecked(checked);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const tgl = getDate();
    const filter = listSuratJalan.map((d) => d.noSuratJalan);
    const update = { receivedIn: cabangTujuan, receivedAt: tgl, receivedBy: data.nama };

    // fetch("/api/data-surat-jalan/update-many-surat-jalan", {
    //   method: "PATCH",
    //   body: JSON.stringify({ filter: filter, update: update }),
    //   headers: { "Content-Type": "application/json" },
    // }).then((response) => {
    //   if (response.status === 201) {
    //     setCabangTujuan("");
    //     setFetchDataManifest([]);
    //     setListSuratJalan([]);
    //     return alert("Surat Jalan Berhasil di Terima \n di cabang " + cabangTujuan);
    //   } else {
    //     return alert("Receiving Surat Jalan Tidak Berhasil \n Cek kembali inputan Anda");
    //   }
    // });

    // Reset All State
  };

  return (
    <div className={styles["container"]}>
      {/* --- Show List Cabang Tujuan if user Role is GEN */}
      {status === "authenticated" ? (
        <div className={styles["cabang-option"]}>
          <label htmlFor="cabangTujuan">Cabang Tujuan</label>
          <select name="cabangTujuan" id="cabangTujuan" defaultValue="" onChange={cabangTujuanChangeHandler}>
            <option value="" disabled>
              --pilih cabang tujuan--
            </option>
            {listCabang.map((d, i) => (
              <option key={i} value={d.cab}>
                {d.cab.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {/* -- Display Table Manifest INCOMING -- */}
      <table className="table-container">
        <thead className="table-head">
          <tr>
            <td>No</td>
            <td>No Manifest</td>
            <td>Asal</td>
            <td>Tujuan</td>
            <td>Coveran</td>
            <td>Status</td>
            <td>Terima</td>
          </tr>
        </thead>
        <tbody className="table-body">
          {cabangTujuan && fetchDataManifest.length > 0 ? (
            fetchDataManifest.map((d, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{d.noManifest}</td>
                <td>{d.cabangAsal.toUpperCase()}</td>
                <td>{d.cabangTujuan.toUpperCase()}</td>
                <td>{d.coveranArea.toUpperCase()}</td>
                <td>
                  {d.suratJalan.map((d) =>
                    d.receivedIn ? (
                      <div className="status-paket">
                        <div>
                          Received in <b>{d.receivedIn.toUpperCase()}</b>
                        </div>
                        <div>tgl {d.receivedAt}</div>
                      </div>
                    ) : (
                      <div className="status-paket">
                        <div>
                          Perjalanan
                          <b>
                            {d.cabangAsal.toUpperCase()} - {d.cabangTujuan.toUpperCase()}
                          </b>
                        </div>
                        <div>tgl {d.tglSuratJalan}</div>
                      </div>
                    )
                  )}
                </td>
                <td>
                  <div className="center-element">
                    <input
                      id="checkbox"
                      name="checkbox"
                      type="radio"
                      onChange={(e) => checkboxChangeHandler(e, d)}
                      disabled={true}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="error-txt">
                Tidak ada data yang ditampilkan
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* -- Display Create MAnifest Description */}
      <div className={styles["container-manifest"]}>
        {Object.keys(manifestChecked).length > 0 ? (
          <div className={styles["container-manifest-detail"]}>
            <span>Anda akan melakukan proses Recieve untuk </span>
            <span>Surat Jalan Nomor {manifestChecked.noManifest}, </span>
            <span>total berat {manifestChecked.jumlahBerat} Kg, </span>
            <span>jumlah paket {manifestChecked.jumlahBarang} koli</span>
          </div>
        ) : (
          <div />
        )}

        <div>
          <Button
            label="Receive Surat Jalan"
            width="full"
            color="black"
            icon={isLoading ? <LoadingSpinner /> : <Check />}
            disabled={!cabangTujuan || Object.keys(manifestChecked).length === 0 ? true : false}
            clickHandler={submitHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default ReceiveManifest;
