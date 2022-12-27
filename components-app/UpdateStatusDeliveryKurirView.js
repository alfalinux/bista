import { useState } from "react";
import ModalUpdateDelivery from "../components-app/ui/ModalUpdateDelivery";
import Button from "./ui/Button";
import styles from "./UpdateStatusDeliveryKurirView.module.css";
import ChevronDown from "../public/icons/ChevronDown";
import GiftBox from "../public/icons/GiftBox";
import Scale from "../public/icons/Scale";
import Money from "../public/icons/money";
import Check from "../public/icons/check";

const UpdateStatusDeliveryKurirView = (props) => {
  const [showDetailSuratJalan, setShowDetailSuratJalan] = useState(false);
  const [detailResiClicked, setDetailResiClicked] = useState([]);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [noResiClicked, setNoResiClicked] = useState("");
  const [noDeliveryClicked, setNoDeliveryClicked] = useState("");

  const suratJalanIconHandler = (e) => {
    setShowDetailSuratJalan(!showDetailSuratJalan);
    setDetailResiClicked([]);
  };

  const resiIconHandler = (noResi) => {
    if (document.getElementById(noResi).style.display === "block") {
      document.getElementById(noResi).style.display = "none";
      setDetailResiClicked((prevDetailResiClicked) => prevDetailResiClicked.filter((d) => d !== noResi));
    } else {
      document.getElementById(noResi).style.display = "block";
      setDetailResiClicked((prevDetailResiClicked) => [...prevDetailResiClicked, noResi]);
    }
    console.log(document.getElementById(noResi).style.display);
  };

  const cardColor = (status) => {
    if (status === "gagal") {
      return styles["card-gagal"];
    } else if (status === "diterima") {
      return styles["card-diterima"];
    } else if (status === "proses") {
      return styles["card-proses"];
    }
  };

  const updateClickHandler = (noResi, noRelivery) => {
    setShowModalUpdate(true);
  };

  const closeUpdateHandler = () => {
    setShowModalUpdate(false);
  };

  return (
    <div className={styles["container"]}>
      {!props.dataDelivery
        ? null
        : props.dataDelivery.map((deliv, index) => (
            <div className={styles["wrapper"]} key={index}>
              <div className={styles["header"]}>
                <span className={styles["noSJ"]}>
                  {deliv.noDelivery} || {deliv.dataResi.length} Resi
                </span>
                <span className={styles["noSJ-icon"]} onClick={suratJalanIconHandler}>
                  <ChevronDown />
                </span>
              </div>
              {showDetailSuratJalan ? (
                <main className={styles["content"]}>
                  {deliv.dataResi.map((resi, index) => (
                    <div className={cardColor(resi.statusDelivery)} key={index}>
                      <section className={styles["resi-icon"]} onClick={() => resiIconHandler(resi.noResi)}>
                        {detailResiClicked.indexOf(resi.noResi) >= 0 ? "-" : "+"}
                      </section>
                      <div className={styles["card-title"]}>{resi.namaPenerima}</div>
                      <div>{resi.nohpPenerima}</div>
                      <div>{resi.alamatPenerima}</div>
                      <div id={resi.noResi} className={styles["card-expand"]}>
                        <div>No Resi : {resi.noResi}</div>
                        <div>Isi Paket : {resi.keteranganBarang}</div>
                        <div className={styles["detail-paket"]}>
                          <span className={styles["jumlah-paket"]}>
                            <GiftBox /> {resi.jumlahBarang} Koli
                          </span>
                          <span className={styles["berat-paket"]}>
                            <Scale /> {resi.beratBarang} Kg
                          </span>
                          <span className={styles["ongkir-paket"]}>
                            <Money /> Rp {Number(resi.grandTotal).toLocaleString("id-ID")} - {resi.pembayaran}
                          </span>
                        </div>
                        <div className={styles["btn-update"]}>
                          <Button
                            label="Update Status"
                            color="black"
                            icon={<Check />}
                            clickHandler={() => updateClickHandler(resi.noresi, deliv.noDelivery)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </main>
              ) : null}
            </div>
          ))}
      {showModalUpdate ? (
        <ModalUpdateDelivery
          onCloseModal={closeUpdateHandler}
          noResi={noResiClicked}
          noDelivery={noDeliveryClicked}
          // cabang={cabangTujuan}
          // kurir={namaKurir}
          // onReset={resetInput}
          // onSet={setInput}
        />
      ) : null}
    </div>
  );
};

export default UpdateStatusDeliveryKurirView;
