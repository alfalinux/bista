import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import styles from "./RincianTransaksiCabang.module.css";
import LoadingPage from "./ui/LoadingPage";
import LoadingSpinner from "../public/icons/loading-spinner";
import Button from "../components-app/ui/Button";
import Check from "../public/icons/check";
import FolderDownloadIcon from "../public/icons/FolderDownloadIcon";
import { CSVDownload } from "react-csv";
import Swal from "sweetalert2";

const RincianOmsetCabang = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data, status } = useSession();
  const [listCabang, setListCabang] = useState([]);

  const [cabangSelected, setCabangSelected] = useState("");
  const [tglAwal, setTglAwal] = useState("");
  const [tglAkhir, setTglAkhir] = useState("");
  const [responseResult, setResponseResult] = useState([]);

  useEffect(() => {
    fetch("/api/cabang")
      .then((response) => response.json())
      .then((data) => setListCabang(data));
  }, []);

  const cabangSelectedHandler = (e) => {
    setCabangSelected(e.target.value);
  };

  const tglAwalHandler = (e) => {
    setTglAwal(e.target.value);
  };

  const tglAkhirHandler = (e) => {
    setTglAkhir(e.target.value);
  };

  console.log(new Date(tglAwal));
  const downloadClickHandler = (e) => {
    e.preventDefault();

    const filter = {
      cabang: cabangSelected,
      tglAwal: new Date(new Date(tglAwal).setHours(0, 0, 0, 1)).toLocaleString("en-UK", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      tglAkhir: new Date(new Date(tglAkhir).setHours(23, 59, 59, 59)).toLocaleString("en-UK", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    console.log(filter);

    fetch("/api/data-resi/rincian-transaksi/" + filter.cabang + "/" + filter.tglAwal + "/" + filter.tglAkhir)
      .then((response) => response.json())
      .then((data) => {
        if (data.message !== "sukses") {
          Swal.fire({
            icon: "warning",
            title: "Warning!",
            text: data.message,
            showConfirmButton: true,
            confirmButtonColor: "red",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data Rincian Transaksi Berhasil di Generate",
            showConfirmButton: true,
            confirmButtonText: "Download",
          }).then((result) => {
            if (result.isConfirmed) {
              setResponseResult(data.result);
            }
          });
        }
      });
  };

  // console.log(responseResult);
  return (
    <div className={styles["container"]}>
      {isLoadingPage ? <LoadingPage /> : null}

      {/* -- Display Form Select Cabang -- */}
      {status !== "authenticated" ? null : (
        <form className={styles["form-wrapper"]}>
          <div className={styles["field"]}>
            <label className={styles["label"]} htmlFor="cabangAsal">
              Cabang
            </label>
            <select name="cabangAsal" id="cabangAsal" value={cabangSelected} onChange={cabangSelectedHandler}>
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
            <label className={styles["label"]} htmlFor="tglAwal">
              Tgl Transaksi
            </label>
            <div className={styles["input-tanggal"]}>
              <input id="tglAwal" name="tglAwal" type="date" value={tglAwal} onChange={tglAwalHandler} />
              <span>s/d</span>
              <input id="tglAkhir" name="tglAkhir" type="date" value={tglAkhir} onChange={tglAkhirHandler} />
            </div>
          </div>
          <div className={styles["download-btn"]}>
            <Button label="Download" color="red" icon={<FolderDownloadIcon />} clickHandler={downloadClickHandler} />
          </div>
        </form>
      )}
      {/* {responseResult.length === 0 ? null : <CSVDownload data={responseResult} />} */}
    </div>
  );
};

export default RincianOmsetCabang;
