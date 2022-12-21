import { useEffect, useState } from "react";

import Layouts from "../_layouts";

import Button from "../../../components-app/ui/Button";
import Printer from "../../../public/icons/printer";
import LoadingSpinner from "../../../public/icons/loading-spinner";
import Search from "../../../public/icons/search";

import styles from "../../../styles/reprint.module.css";
import suratjalanPdf from "../../../helpers/suratjalanPdf";

const ReprintSuratJalanPage = () => {
  const [nomorSuratJalan, setNomorSuratJalan] = useState("");
  const [getDataSuratJalan, setGetDataSuratJalan] = useState("");
  const [getDataManifest, setGetDataManifest] = useState([]);
  const [dataNotFound, setDataNotFound] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (e) => {
    setNomorSuratJalan(e.target.value.toUpperCase());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!nomorSuratJalan) {
      setDataNotFound("Nomor Surat Jalan Tidak Ditemukan");
      setIsLoading(false);
      setGetDataSuratJalan("");
      return;
    }
    setIsLoading(true);
    fetch("/api/data-surat-jalan/" + nomorSuratJalan)
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          setDataNotFound("Nomor Surat Jalan Tidak Ditemukan");
          setIsLoading(false);
          setGetDataSuratJalan("");
          return;
        }
        setGetDataSuratJalan(data);
        setIsLoading(false);
        setDataNotFound("");
      });
  };

  useEffect(() => {
    if (getDataSuratJalan) {
      fetch("/api/data-manifest/find-many/" + getDataSuratJalan.dataManifest.map((d) => d.noManifest).join("/"))
        .then((response) => response.json())
        .then((data) => setGetDataManifest(data));
    }
  }, [getDataSuratJalan]);

  return (
    <Layouts>
      <div id="bungkus" className={styles["bungkus"]}>
        <div className={styles["container"]}>
          <form className={styles["wrapper"]} onSubmit={submitHandler}>
            <label htmlFor="reprintSuratJalan">
              <h2>Reprint Surat Jalan</h2>
            </label>
            <div className={styles["action"]}>
              <input
                type="text"
                id="reprintSuratJalan"
                name="reprintSuratJalan"
                placeholder="Masukkan Nomor Surat Jalan"
                onChange={changeHandler}
                autoComplete="off"
                required
              />
              {!isLoading ? (
                <Button type="submit" label="Cari Surat Jalan" color="red" icon={<Search />} />
              ) : (
                <div>
                  <LoadingSpinner />
                  <LoadingSpinner />
                </div>
              )}
            </div>
          </form>
          {dataNotFound ? <p>{dataNotFound}</p> : null}
          {getDataSuratJalan ? (
            <table className={styles["container"]}>
              <tbody>
                <tr>
                  <th>Nomor Surat Jalan</th>
                  <th>Tanggal</th>
                  <th>Cabang Asal</th>
                  <th>Cabang Tujuan</th>
                  <th>Actions</th>
                </tr>
                <tr>
                  <td>{getDataSuratJalan.noSuratJalan}</td>
                  <td>{getDataSuratJalan.tglSuratJalan}</td>
                  <td>{getDataSuratJalan.cabangAsal.toUpperCase()}</td>
                  <td>{getDataSuratJalan.cabangTujuan.toUpperCase()}</td>
                  <td className={styles["btn-table"]}>
                    <Button
                      clickHandler={() => suratjalanPdf(getDataSuratJalan, getDataManifest)}
                      label="Cetak Surat Jalan"
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

export default ReprintSuratJalanPage;
