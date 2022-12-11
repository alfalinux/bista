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
  const [fetchDataSuratJalan, setFetchDataSuratJalan] = useState([]);
  const [listManifest, setListManifest] = useState([]);
  const [manifestStatus, setManifestStatus] = useState([]);

  // console.log(manifestStatus);
  useEffect(() => {
    if (fetchDataManifest.length > 0 || fetchDataSuratJalan > 0) {
      const statusManifest = fetchDataManifest
        .map((d) => d.noManifest)
        .map((noManifest) => ({
          noManifest: noManifest,
          dataSuratJalan: fetchDataSuratJalan.filter((d) =>
            d.dataManifest.map((d) => d.noManifest).includes(noManifest)
          ),
        }));
      setManifestStatus(statusManifest);
    }
  }, [fetchDataManifest, fetchDataSuratJalan]);

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
    if (fetchDataManifest.length > 0) {
      const listManifest = fetchDataManifest.map((d) => d.noManifest).join("/");
      fetch("/api/data-manifest/inside-surat-jalan/" + listManifest)
        .then((response) => response.json())
        .then((data) => setFetchDataSuratJalan(data));
    }
  }, [fetchDataManifest]);

  const cabangTujuanChangeHandler = (e) => {
    setIsLoading(true);
    setCabangTujuan(e.target.value);
    setIsLoading(false);
    setListManifest([]);
  };

  const checkboxChangeHandler = (e, checked) => {
    if (e.target.checked) {
      setListManifest((prevListManifest) => [...prevListManifest, checked]);
    }

    if (!e.target.checked) {
      setListManifest((prevListManifest) => prevListManifest.filter((d) => d.noManifest !== checked.noManifest));
    }
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
            <td>Nopol / No AWB</td>
            <td>Terima</td>
          </tr>
        </thead>
        <tbody className="table-body">
          {cabangTujuan && fetchDataManifest.length !== 0 ? (
            fetchDataManifest.map((d, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{d.noManifest}</td>
                <td>{d.cabangAsal.toUpperCase()}</td>
                <td>{d.cabangTujuan.toUpperCase()}</td>
                <td>{d.coveranArea.toUpperCase()}</td>
                <td>
                  <div>
                    {(() => {
                      const noManifest = d.noManifest;
                      const suratJalan = manifestStatus.filter((data) => data.noManifest === noManifest);
                      return suratJalan[0].dataSuratJalan[0].noSuratJalan;
                    })()}
                  </div>
                </td>
                <td></td>
                <td className="center-element">
                  <input id="checkbox" type="checkbox" onChange={(e) => checkboxChangeHandler(e, d)} />
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
        {listManifest.length !== 0 ? (
          <div className={styles["container-manifest-detail"]}>
            <span>Anda akan melakukan proses Recieve untuk </span>
            <span>{listManifest.length} Surat Jalan, </span>
            <span>total berat {listManifest.reduce((total, obj) => Number(obj.beratBarang) + total, 0)} Kg, </span>
            <span>jumlah paket {listManifest.reduce((total, obj) => Number(obj.konsolidasi) + total, 0)} koli</span>
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
            disabled={!cabangTujuan || listManifest.length === 0 ? true : false}
            clickHandler={submitHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default ReceiveManifest;
