import { useState } from "react";
import Refresh from "../../public/icons/refresh";
import Button from "./Button";
import styles from "./ModalUpdateDelivery.module.css";

const ModalUpdateDelivery = (props) => {
  const [statusDelivery, setStatusDelivery] = useState("");
  const [keteranganDelivery, setKeteranganDelivery] = useState("");

  const statusChangeHandler = (e) => {
    setStatusDelivery(e.target.value);
  };
  const keteranganChangeHandler = (e) => {
    setKeteranganDelivery(e.target.value);
  };

  return (
    <div className={styles["container"]}>
      <div>
        <form className={styles["form-container"]}>
          <div className={styles["form-title"]}>Update Status Delivery</div>
          <div className={styles["form-field"]}>
            <label htmlFor="status">Status</label>
            <select name="status" id="status" onChange={statusChangeHandler}>
              <option value="gagal">GAGAL</option>
              <option value="diterima">DITERIMA</option>
            </select>
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="keterangan">
              {statusDelivery === "gagal"
                ? "Alasan Gagal Kirim"
                : statusDelivery === "diterima"
                ? "Nama Penerima"
                : "Keterangan"}
            </label>
            <input type="text" id="keterangan" name="keterangan" autoComplete="off" required />
          </div>
          <div>
            <Button label="Update Status" color="red" width="full" icon={<Refresh />} />
          </div>
        </form>
      </div>
      <div className={styles["backdrop"]} onClick={props.onCloseModal}></div>
    </div>
  );
};

export default ModalUpdateDelivery;
