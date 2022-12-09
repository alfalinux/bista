import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./CreateSuratJalan.module.css";
import LoadingSpinner from "../public/icons/loading-spinner";
import Check from "../public/icons/check";
import Button from "./ui/Button";

const CreateSuratJalan = () => {
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [listCabang, setListCabang] = useState([]);
  const [cabangAsal, setCabangAsal] = useState("");
  const [cabangTujuan, setCabangTujuan] = useState("");
  const [namaDriver, setNamaDriver] = useState("");
  const [nopolDriver, setNopolDriver] = useState("");
  const [fetchDataManifest, setFetchDataManifest] = useState([]);
  const [listManifest, setListManifest] = useState([]);

  useEffect(() => {
    fetch("/api/cabang")
      .then((response) => response.json())
      .then((data) => setListCabang(data));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (cabangAsal) {
      fetch("/api/data-manifest/belum-surat-jalan/" + cabangAsal)
        .then((response) => response.json())
        .then((data) => {
          setFetchDataManifest(data);
          setIsLoading(false);
        });
    }
  }, [cabangAsal]);

  const cabangAsalChangeHandler = (e) => {
    if (e.target.value === "") {
      setCabangAsal("");
      setCabangTujuan("");
      setFetchDataManifest([]);
      setNamaDriver("");
      setNopolDriver("");
      setFetchDataManifest([]);
      setListManifest([]);
    }
    setCabangAsal(e.target.value);
  };

  const cabangTujuanChangeHandler = (e) => {
    if (e.target.value === "") {
      setCabangTujuan("");
    }
    setCabangTujuan(e.target.value);
  };

  const namaDriverChangeHandler = (e) => {
    setNamaDriver(e.target.value);
  };
  const nopolDriverChangeHandler = (e) => {
    setNopolDriver(e.target.value);
  };

  const checkboxChangeHandler = (e, dataManifestChecked) => {
    if (e.target.checked) {
      setListManifest((prevListManifest) => [...prevListManifest, dataManifestChecked]);
    }

    if (!e.target.checked) {
      setListManifest((prevListManifest) =>
        prevListManifest.filter((d) => d.noManifest !== dataManifestChecked.noManifest)
      );
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  console.log(listManifest);
  return (
    <div className={styles["container"]}>
      {status === "authenticated" ? (
        <>
          <form className={styles["form-wrapper"]}>
            <div className={styles["field"]}>
              <label className={styles["label"]} htmlFor="cabangAsal">
                Cabang Asal
              </label>
              <select name="cabangAsal" id="cabangAsal" onChange={cabangAsalChangeHandler}>
                <option defaultValue=""></option>
                {data.posisi === "GEN"
                  ? listCabang.map((d, i) => (
                      <option key={i} value={d.cab}>
                        {d.cab.toUpperCase()}
                      </option>
                    ))
                  : listCabang
                      .filter((d) => d.tlc == data.cabang)
                      .map((d, i) => (
                        <option key={i} value={d.cab}>
                          {d.cab.toUpperCase()}
                        </option>
                      ))}
              </select>
            </div>

            <div className={styles["field"]}>
              <label className={styles["label"]} htmlFor="cabangTujuan">
                Cabang Tujuan
              </label>
              <select name="cabangTujuan" id="cabangTujuan" onChange={cabangTujuanChangeHandler}>
                <option defaultValue=""></option>
                {cabangAsal
                  ? listCabang.map((d, i) => (
                      <option key={i} value={d.cab}>
                        {d.cab.toUpperCase()}
                      </option>
                    ))
                  : null}
              </select>
            </div>

            <div className={styles["field"]}>
              <label className={styles["label"]} htmlFor="namaDriver">
                Nama Driver / Vendor
              </label>
              <input
                type="text"
                id="namaDriver"
                name="namaDriver"
                value={namaDriver}
                onChange={namaDriverChangeHandler}
                required
              />
            </div>

            <div className={styles["field"]}>
              <label className={styles["label"]} htmlFor="nopolDriver">
                Nopol Driver / No AWB Vendor
              </label>
              <input
                type="text"
                id="nopolDriver"
                name="nopolDriver"
                value={nopolDriver}
                onChange={nopolDriverChangeHandler}
                required
              />
            </div>
          </form>

          {/* -- Display Table Manifest -- */}
          <table className="table-container">
            <thead className="table-head">
              <tr>
                <td>No</td>
                <td>No Manifest</td>
                <td>Asal</td>
                <td>Tujuan</td>
                <td>Coveran</td>
                <td>Pilih</td>
              </tr>
            </thead>
            <tbody className="table-body">
              {cabangTujuan && fetchDataManifest
                ? fetchDataManifest.map((d, i) => (
                    <tr key={i}>
                      <td className="center-element">{i + 1}</td>
                      <td>{d.noManifest}</td>
                      <td>{d.dataResi[0].cabangAsal.toUpperCase()}</td>
                      <td>{d.dataResi[0].cabangTujuan.toUpperCase()}</td>
                      <td>{d.dataResi[0].coveranArea.toUpperCase()}</td>
                      <td className="center-element">
                        <input
                          id="checkbox"
                          type="checkbox"
                          onChange={(e) =>
                            checkboxChangeHandler(e, {
                              noManifest: d.noManifest,
                              cabangAsal: d.dataResi[0].cabangAsal,
                              cabangAsalTlc: d.dataResi[0].cabangAsalTlc,
                              cabangTujuan: d.dataResi[0].cabangAsal,
                              cabangTujuanTlc: d.dataResi[0].cabangTujuanTlc,
                              coveranArea: d.dataResi[0].coveranArea,
                              coveranAreaTlc: d.dataResi[0].coveranAreaTlc,
                              beratBarang: d.dataResi.reduce((total, obj) => Number(obj.beratBarang) + total, 0),
                              konsolidasi: d.konsolidasi,
                            })
                          }
                        />
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>

          {/* -- Display Create surat jalan Description */}
          {listManifest ? (
            <div className={styles["container-manifest"]}>
              <div>
                {cabangAsal.toUpperCase()} - {cabangTujuan.toUpperCase()}
              </div>
              <div className={styles["container-manifest-detail"]}>
                <div>{listManifest.length} Manifest</div>
                <div>{listManifest.reduce((total, obj) => Number(obj.beratBarang) + total, 0)} Kg</div>
                <div>{listManifest.reduce((total, obj) => Number(obj.konsolidasi) + total, 0)} Koli</div>
              </div>

              <div>
                <Button
                  label="Create Manifest"
                  width="full"
                  color="black"
                  icon={isLoading ? <LoadingSpinner /> : <Check />}
                  disabled={
                    !cabangAsal || !cabangTujuan || listManifest.length === 0 || !namaDriver || !nopolDriver
                      ? true
                      : false
                  }
                  clickHandler={submitHandler}
                />
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default CreateSuratJalan;
