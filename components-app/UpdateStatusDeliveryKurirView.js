import styles from "./UpdateStatusDeliveryKurirView.module.css";
import ChevronDown from "../public/icons/ChevronDown";
import { useState } from "react";

const UpdateStatusDeliveryKurirView = (props) => {
  const [showDetailSuratJalan, setShowDetailSuratJalan] = useState(false);
  const [showDetailResi, setShowDetailResi] = useState(false);

  const suratJalanIconHandler = (e) => {
    setShowDetailSuratJalan(!showDetailSuratJalan);
  };

  const resiIconHandler = (e) => {
    // setShowDetailResi(!showDetailResi);
    console.log();
  };

  return (
    <div className={styles["container"]}>
      {!props.dataDelivery
        ? null
        : props.dataDelivery.map((deliv, index) => (
            <div className={styles["wrapper"]} key={index}>
              <head className={styles["header"]}>
                <span className={styles["noSJ"]}>
                  {deliv.noDelivery} || {deliv.dataResi.length} Resi
                </span>
                <span className={styles["noSJ-icon"]} onClick={suratJalanIconHandler}>
                  <ChevronDown />
                </span>
              </head>
              {showDetailSuratJalan ? (
                <main className={styles["content"]}>
                  {deliv.dataResi.map((resi, index) => (
                    <div className={styles["card"]} key={index}>
                      <div className={styles["card-title"]}>
                        <span className={styles["noResi"]}>{resi.noResi}</span>
                        <span className={styles["noResi-icon"]} onClick={() => resiIconHandler(index)}>
                          <ChevronDown />
                        </span>
                      </div>
                      <div>{resi.namaPenerima}</div>
                      <div>{resi.nohpPenerima}</div>
                      <div>{resi.alamatPenerima}</div>
                      {showDetailResi ? (
                        <div className={styles["noResi-detail"]}>
                          <span>
                            {resi.pembayaran.toUpperCase()} Rp.{Number(resi.grandTotal).toLocaleString("id-ID")}
                          </span>
                          <span>
                            {resi.jumlahBarang} Koli - {resi.beratBarang} Kg
                          </span>
                          <span>Isi Paket: {resi.keteranganBarang}</span>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </main>
              ) : null}
            </div>
          ))}
    </div>
  );
};

export default UpdateStatusDeliveryKurirView;
