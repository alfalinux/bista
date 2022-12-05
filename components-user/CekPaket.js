import { useRef, useState } from "react";
import MainNav from "./MainNav";

import Button from "../components-app/ui/Button";
import Search from "../public/icons/search";
import LoadingSpinner from "../public/icons/loading-spinner";

import styles from "./CekPaket.module.css";

const CekPaket = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const noResiRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    fetch("/api/data-resi/" + noResiRef.current.value.toUpperCase())
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  //   console.log(noResiRef.current.value);
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
          <div>
            <div>ICON</div>
            <div>
              <div>Posisi Paket</div>
              <div>Tanggal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CekPaket;
