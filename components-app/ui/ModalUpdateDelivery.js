import { useSession } from "next-auth/react";
import { useState } from "react";
import Check from "../../public/icons/check";
import LoadingSpinner from "../../public/icons/loading-spinner";
import Refresh from "../../public/icons/refresh";
import Button from "./Button";
import styles from "./ModalUpdateDelivery.module.css";

const ModalUpdateDelivery = (props) => {
  const { data, status } = useSession();
  const [statusDelivery, setStatusDelivery] = useState("");
  const [keteranganDelivery, setKeteranganDelivery] = useState("");

  const statusChangeHandler = (e) => {
    setStatusDelivery(e.target.value);
  };

  const keteranganChangeHandler = (e) => {
    setKeteranganDelivery(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onReset();
    const tgl = new Date().toLocaleString("en-UK", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const filter = {
      noResi: props.noResi,
      noDelivery: props.noDelivery,
    };

    const update = {
      statusDelivery: statusDelivery,
      keteranganDelivery: keteranganDelivery,
      deliveredAt: tgl,
      deliveredBy: data.nama,
    };

    fetch("/api/data-resi/update-one-resi-by-delivery", {
      method: "PATCH",
      body: JSON.stringify({ filter: filter, update: update }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.status === 201) {
        fetch("/api/data-delivery/update-delivery", {
          method: "PATCH",
          body: JSON.stringify({ filter: filter, update: update }),
          headers: { "Content-Type": "application/json" },
        }).then((response) => {
          if (response.status === 201) {
            setStatusDelivery("");
            setKeteranganDelivery("");
            props.onCloseModal();
            props.onSet(props.cabang, props.kurir);
            alert("Status Delivery Resi Berhasil di Update");
          } else {
            alert("Gagal Update Data Delivery");
          }
        });
      } else {
        alert("Gagal Update Data Resi");
      }
    });
  };

  return (
    <div className={styles["container"]}>
      <div>
        <form className={styles["form-container"]}>
          <>
            <div className={styles["form-title"]}>Update Status Delivery</div>
            <div className={styles["form-text"]}>{props.noResi}</div>
            <div className={styles["form-field"]}>
              <label htmlFor="status">Status</label>
              <select name="status" id="status" onChange={statusChangeHandler} defaultValue={""}>
                <option value="" disabled={true}>
                  --Pilih Status--
                </option>
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
              <input
                type="text"
                id="keterangan"
                name="keterangan"
                autoComplete="off"
                placeholder="isi Keterangan..."
                required
                value={keteranganDelivery}
                onChange={keteranganChangeHandler}
              />
            </div>
            <div>
              <Button
                label="Update Status"
                color="red"
                width="full"
                icon={<Refresh />}
                clickHandler={submitHandler}
                disabled={(!statusDelivery, !keteranganDelivery)}
              />
            </div>
          </>
        </form>
      </div>
      <div className={styles["backdrop"]} onClick={props.onCloseModal}></div>
    </div>
  );
};

export default ModalUpdateDelivery;
