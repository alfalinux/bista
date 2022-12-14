import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getDate from "../helpers/getDate";

import styles from "./ReceiveManifest.module.css";
import Button from "./ui/Button";
import Check from "../public/icons/check";
import LoadingSpinner from "../public/icons/loading-spinner";
import LoadingPage from "./ui/LoadingPage";
import Swal from "sweetalert2";

const ReceiveManifest = () => {
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [listCabang, setListCabang] = useState([]);

  const [cabangTujuan, setCabangTujuan] = useState("");
  const [fetchDataManifest, setFetchDataManifest] = useState([]);
  const [manifestChecked, setManifestChecked] = useState([]);

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }
    fetch("/api/cabang")
      .then((response) => response.json())
      .then((data) => setListCabang(data));
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

  useEffect(() => {
    const checkbox = document.querySelectorAll("#checkbox");
    for (let item of checkbox) {
      item.checked = false;
    }
  }, [cabangTujuan]);

  const cabangTujuanChangeHandler = (e) => {
    setIsLoading(true);
    setCabangTujuan(e.target.value);
    setManifestChecked([]);
    setIsLoading(false);
  };

  const checkboxChangeHandler = (e, checked) => {
    if (e.target.checked) {
      setManifestChecked((prevManifestChecked) => [...prevManifestChecked, checked]);
    }

    if (!e.target.checked) {
      setManifestChecked((prevManifestChecked) =>
        prevManifestChecked.filter((d) => d.noManifest !== checked.noManifest)
      );
    }
  };

  const submitHandler = (e) => {
    setIsLoadingPage(true);
    e.preventDefault();
    const tgl = new Date().toISOString();
    const filter = manifestChecked.map((d) => d.noManifest);
    const update = { receivedIn: cabangTujuan, receivedAt: tgl, receivedBy: data.nama };
    const filterResi = manifestChecked
      .map((d) => d.dataResi.map((d) => d.noResi))
      .join()
      .split(",");
    const updateResi = { manifestReceivedIn: cabangTujuan, manifestReceivedAt: tgl, manifestReceivedBy: data.nama };

    fetch("/api/data-resi/update-many-resi", {
      method: "PATCH",
      body: JSON.stringify({ filter: filterResi, update: updateResi }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.status === 201) {
        setCabangTujuan("");
        fetch("/api/data-manifest/update-receive-manifest", {
          method: "PATCH",
          body: JSON.stringify({ filter: filter, update: update }),
          headers: { "Content-Type": "application/json" },
        }).then((response) => {
          if (response.status === 201) {
            setCabangTujuan(update.receivedIn);
            setManifestChecked([]);
            setIsLoadingPage(false);
            Swal.fire({
              title: "Berhasil",
              text: "Manifest Berhasil di Recieve",
              icon: "success",
              showCloseButton: true,
            });
          } else {
            setManifestChecked([]);
            setIsLoadingPage(false);
            Swal.fire({
              title: "Gagal",
              text: "Receiving Manifest Tidak Berhasil",
              icon: "error",
              showCloseButton: true,
            });
          }
        });
      } else {
        setIsLoadingPage(false);
        Swal.fire({
          title: "Gagal",
          text: "Update Data Resi Tidak Berhasil",
          icon: "error",
          showCloseButton: true,
        });
      }
    });
  };

  return (
    <div className={styles["container"]}>
      {isLoadingPage ? <LoadingPage /> : null}

      {/* --- Show List Cabang Tujuan if user Role is GEN */}
      {status === "authenticated" ? (
        <div className={styles["cabang-option"]}>
          <label htmlFor="cabangTujuan">Cabang</label>
          <select name="cabangTujuan" id="cabangTujuan" defaultValue="" onChange={cabangTujuanChangeHandler}>
            <option value="" disabled>
              --pilih cabang tujuan--
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
                  {(() => {
                    const sj = d.suratJalan[d.suratJalan.length - 1];
                    if (sj.receivedIn) {
                      return (
                        <div className="status-paket" key={i}>
                          <div>
                            Received in <b>{sj.receivedIn.toUpperCase()}</b>
                          </div>
                          <div>Tgl {getDate(sj.receivedAt)}</div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="status-paket">
                          <div>
                            Perjalanan
                            <b>
                              {sj.cabangAsal.toUpperCase()} - {sj.cabangTujuan.toUpperCase()}
                            </b>
                          </div>
                          <div>Tgl {getDate(sj.tglSuratJalan)}</div>
                        </div>
                      );
                    }
                  })()}
                </td>
                <td>
                  <div className="center-element">
                    <input
                      id="checkbox"
                      name="checkbox"
                      type="checkbox"
                      onChange={(e) => checkboxChangeHandler(e, d)}
                      disabled={
                        !d.suratJalan
                          .map((d) => d.receivedIn)
                          .join()
                          .split(",")
                          .includes(cabangTujuan)
                      }
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
            <span>{manifestChecked.length} Nomor Manifest</span>
            <span>
              total berat barang{" "}
              {manifestChecked.map((d) => d.jumlahBerat).reduce((total, val) => Number(val) + total, 0)} Kg,{" "}
            </span>
            <span>
              jumlah barang {manifestChecked.map((d) => d.konsolidasi).reduce((total, val) => Number(val) + total, 0)}{" "}
              Koli
            </span>
          </div>
        ) : (
          <div />
        )}

        <div>
          <Button
            label="Receive Manifest"
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
