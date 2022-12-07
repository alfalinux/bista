import { useRef, useState } from "react";
import MainNav from "./MainNav";

import Button from "../components-app/ui/Button";
import Search from "../public/icons/search";
import LoadingSpinner from "../public/icons/loading-spinner";
import Check from "../public/icons/check";

import styles from "./CekPaket.module.css";

const CekPaket = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [dataResi, setDataResi] = useState({});
  const noResiRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch("/api/data-resi/" + noResiRef.current.value.toUpperCase())
      .then((response) => response.json())
      .then((data) => {
        setFetchSuccess(true);
        setDataResi(data);
        setIsLoading(false);
      });
  };
  console.log(dataResi);
  return (
    <div>
      <MainNav />
      <div className={styles["container"]}>
        <div className={styles["card-1"]}>
          <h2 className={styles["title"]}>Cek Paket</h2>
          <form className={styles["form-container"]} onSubmit={submitHandler}>
            <label htmlFor="noResi">Nomor Resi</label>
            <input type="text" id="noResi" name="noResi" placeholder="Ketik Nomor Resi..." ref={noResiRef} />
            {isLoading ? (
              <div className={styles["icon"]}>
                <LoadingSpinner />
              </div>
            ) : (
              <Button label="Cek Status Paket" color="red" icon={<Search />} width="full" />
            )}
          </form>
        </div>
        <div className={styles["card-2"]}>
          <h2 className={styles["title"]}>Detail Posisi Paket</h2>

          {fetchSuccess ? (
            <div className={styles["content"]}>
              <div className={styles["content__icon"]}>
                <Check />
              </div>
              <div className={styles["content__detail"]}>
                <div className={styles["content__title"]}>
                  Transaksi Pengiriman [{dataResi.cabangAsal.toUpperCase()}]
                </div>
                <div className={styles["content__date"]}>{dataResi.tglTransaksi}</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CekPaket;
