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
  const [noResi, setNoResi] = useState("");

  const noResiChangeHandler = (e) => {
    setNoResi(e.target.value);
  };
  const submitHandler = (e) => {
    setFetchSuccess(false);
    e.preventDefault();
    setIsLoading(true);
    fetch("/api/data-resi/cek-resi/" + noResi.toUpperCase())
      .then((response) => response.json())
      .then((data) => {
        setFetchSuccess(true);
        setDataResi(data);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <MainNav />
      <div className={styles["container"]}>
        <div className={styles["card-1"]}>
          <h2 className={styles["title"]}>Cek Paket</h2>
          <form className={styles["form-container"]} onSubmit={submitHandler}>
            <label htmlFor="noResi">Nomor Resi</label>
            <input
              type="text"
              id="noResi"
              name="noResi"
              placeholder="Ketik Nomor Resi..."
              onChange={noResiChangeHandler}
              value={noResi}
              required
              autoComplete="off"
            />
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
            dataResi.noResi === "" || noResi === "" ? (
              <div>Nomor Resi Tidak Terdaftar</div>
            ) : (
              <>
                {/* Transaksi */}
                <div className={styles["content"]}>
                  <div className={styles["content__icon"]}>
                    <Check />
                  </div>
                  <div className={styles["content__detail"]}>
                    <div className={styles["content__title"]}>
                      Transaksi Pengiriman [Cabang {dataResi.resiCreatedIn.toUpperCase()}]
                    </div>
                    <div className={styles["content__date"]}>{dataResi.tglResi}</div>
                  </div>
                </div>

                {/* Manifest */}
                {dataResi.noManifest === "" ? null : (
                  <div className={styles["content"]}>
                    <div className={styles["content__icon"]}>
                      <Check />
                    </div>
                    <div className={styles["content__detail"]}>
                      <div className={styles["content__title"]}>
                        Proses Pemberangkatan [Gateway {dataResi.manifestCreatedIn.toUpperCase()}]
                      </div>
                      <div className={styles["content__date"]}>{dataResi.tglManifest}</div>
                    </div>
                  </div>
                )}

                {/* Surat Jalan */}
                {dataResi.listSuratJalan.length === 0
                  ? null
                  : dataResi.listSuratJalan.map((d) => (
                      <>
                        <div className={styles["content"]}>
                          <div className={styles["content__icon"]}>
                            <Check />
                          </div>
                          <div className={styles["content__detail"]}>
                            <div className={styles["content__title"]}>
                              Paket Berangkat Menuju {d.cabangTujuan.toUpperCase()}
                            </div>
                            <div className={styles["content__date"]}>{d.tglSuratJalan}</div>
                          </div>
                        </div>
                        {d.receivedAt ? (
                          <div className={styles["content"]}>
                            <div className={styles["content__icon"]}>
                              <Check />
                            </div>
                            <div className={styles["content__detail"]}>
                              <div className={styles["content__title"]}>
                                Paket Telah Sampai di {d.receivedIn.toUpperCase()}
                              </div>
                              <div className={styles["content__date"]}>{d.receivedAt}</div>
                            </div>
                          </div>
                        ) : null}
                      </>
                    ))}

                {/* Delivery */}
                {dataResi.listDelivery.map((d) => (
                  <>
                    <div className={styles["content"]}>
                      <div className={styles["content__icon"]}>
                        <Check />
                      </div>
                      <div className={styles["content__detail"]}>
                        <div className={styles["content__title"]}>Paket Sedang Diantar [{d.namaKurir}]</div>
                        <div className={styles["content__date"]}>{d.tglDelivery}</div>
                      </div>
                    </div>
                    {d.deliveredAt ? (
                      <div className={styles["content"]}>
                        <div className={styles["content__icon"]}>
                          <Check />
                        </div>
                        <div className={styles["content__detail"]}>
                          <div className={styles["content__title"]}>
                            {d.statusDelivery === "diterima"
                              ? "Paket Telah Diterima Oleh - " + d.keteranganDelivery
                              : d.statusDelivery === "gagal"
                              ? "Paket Tidak Terantar - " + d.keteranganDelivery
                              : ""}
                          </div>
                          <div className={styles["content__date"]}>{d.deliveredAt}</div>
                        </div>
                      </div>
                    ) : null}
                  </>
                ))}
              </>
            )
          ) : isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>Silahkan ketik nomor resi...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CekPaket;
