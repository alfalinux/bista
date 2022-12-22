import { useState } from "react";

import Layouts from "../_layouts";

import Button from "../../../components-app/ui/Button";
import Printer from "../../../public/icons/printer";
import LoadingSpinner from "../../../public/icons/loading-spinner";
import Search from "../../../public/icons/search";

import styles from "../../../styles/reprint.module.css";
import deliveryPdf from "../../../helpers/deliveryPdf";

const ReprintDeliveryPage = () => {
  const [nomorDelivery, setNomorDelivery] = useState("");
  const [getDataDelivery, setGetDataDelivery] = useState({});
  const [dataNotFound, setDataNotFound] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (e) => {
    setNomorDelivery(e.target.value.toUpperCase());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!nomorDelivery) {
      setDataNotFound("Nomor Delivery Tidak Ditemukan");
      setIsLoading(false);
      setGetDataDelivery("");
      return;
    }
    setIsLoading(true);
    fetch("/api/data-delivery/" + nomorDelivery)
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          setDataNotFound("Nomor Delivery Tidak Ditemukan");
          setIsLoading(false);
          setGetDataDelivery("");
          return;
        }
        setGetDataDelivery(data);
        setIsLoading(false);
        setDataNotFound("");
      });
  };

  return (
    <Layouts>
      <div id="bungkus" className={styles["bungkus"]}>
        <div className={styles["container"]}>
          <form className={styles["wrapper"]} onSubmit={submitHandler}>
            <label htmlFor="reprintDelivery">
              <h2>Reprint Delivery</h2>
            </label>
            <div className={styles["action"]}>
              <input
                type="text"
                id="reprintDelivery"
                name="reprintDelivery"
                placeholder="Masukkan Nomor Delivery"
                onChange={changeHandler}
                autoComplete="off"
                required
              />
              {!isLoading ? (
                <Button type="submit" label="Cari Delivery" color="red" icon={<Search />} />
              ) : (
                <div>
                  <LoadingSpinner />
                  <LoadingSpinner />
                </div>
              )}
            </div>
          </form>
          {dataNotFound ? <p>{dataNotFound}</p> : null}
          {Object.keys(getDataDelivery).length > 0 ? (
            <table className={styles["container"]}>
              <tbody>
                <tr>
                  <th>Nomor Delivery</th>
                  <th>Tanggal</th>
                  <th>Cabang</th>
                  <th>Nama Kurir</th>
                  <th>Actions</th>
                </tr>
                <tr>
                  <td>{getDataDelivery.noDelivery}</td>
                  <td>{getDataDelivery.tglDelivery}</td>
                  <td>{getDataDelivery.cabang.toUpperCase()}</td>
                  <td>{getDataDelivery.namaKurir.toUpperCase()}</td>
                  <td className={styles["btn-table"]}>
                    <Button
                      clickHandler={() => deliveryPdf(getDataDelivery)}
                      label="Cetak Delivery"
                      color="red"
                      icon={<Printer />}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
    </Layouts>
  );
};

export default ReprintDeliveryPage;
