import { useState } from "react";
import Head from "next/head";

import Layouts from "../_layouts";

import Button from "../../../components-app/ui/Button";
import Printer from "../../../public/icons/printer";
import LoadingSpinner from "../../../public/icons/loading-spinner";
import Search from "../../../public/icons/search";

import styles from "../../../styles/reprint.module.css";
import manifestPdf from "../../../helpers/manifestPdf";

const ReprintManifestPage = () => {
  const [nomorManifest, setNomorManifest] = useState("");
  const [getDataManifest, setGetDataManifest] = useState("");
  const [dataNotFound, setDataNotFound] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (e) => {
    setNomorManifest(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!nomorManifest) {
      setDataNotFound("Nomor Manifest Tidak Ditemukan");
      setIsLoading(false);
      setGetDataManifest("");
      return;
    }
    setIsLoading(true);
    fetch("/api/data-manifest/" + nomorManifest)
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          setDataNotFound("Nomor Manifest Tidak Ditemukan");
          setIsLoading(false);
          setGetDataManifest("");
          return;
        }
        setGetDataManifest(data);
        setIsLoading(false);
        setDataNotFound("");
      });
  };

  return (
    <>
      <Head>
        <title>Reprint Manifest</title>
      </Head>
      <Layouts>
        <div id="bungkus" className={styles["bungkus"]}>
          <div className={styles["container"]}>
            <form className={styles["wrapper"]} onSubmit={submitHandler}>
              <label htmlFor="reprintManifest">
                <h2>Reprint Manifest</h2>
              </label>
              <div className={styles["action"]}>
                <input
                  type="text"
                  id="reprintManifest"
                  name="reprintManifest"
                  placeholder="Masukkan Nomor Manifest"
                  onChange={changeHandler}
                  autoComplete="off"
                  required
                />
                {!isLoading ? (
                  <Button type="submit" label="Cari Manifest" color="red" icon={<Search />} />
                ) : (
                  <div>
                    <LoadingSpinner />
                    <LoadingSpinner />
                  </div>
                )}
              </div>
            </form>
            {dataNotFound ? <p>{dataNotFound}</p> : null}
            {getDataManifest ? (
              <table className={styles["container"]}>
                <tbody>
                  <tr>
                    <th>Nomor Manifest</th>
                    <th>Tanggal</th>
                    <th>Asal</th>
                    <th>Tujuan</th>
                    <th>Coveran</th>
                    <th>Actions</th>
                  </tr>
                  <tr>
                    <td>{getDataManifest.noManifest}</td>
                    <td>{getDataManifest.tglManifest}</td>
                    <td>{getDataManifest.cabangAsal.toUpperCase()}</td>
                    <td>{getDataManifest.cabangTujuan.toUpperCase()}</td>
                    <td>{getDataManifest.coveranArea.toUpperCase()}</td>
                    <td className={styles["btn-table"]}>
                      <Button
                        clickHandler={() => manifestPdf(getDataManifest)}
                        label="Cetak Manifest"
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
    </>
  );
};

export default ReprintManifestPage;
