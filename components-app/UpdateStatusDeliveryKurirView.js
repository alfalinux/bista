import { useState } from "react";
import ModalUpdateDelivery from "../components-app/ui/ModalUpdateDelivery";
import ModalStatusDelivery from "../components-app/ui/ModalStatusDelivery";
import Button from "./ui/Button";
import styles from "./UpdateStatusDeliveryKurirView.module.css";
import ChevronDown from "../public/icons/ChevronDown";
import GiftBox from "../public/icons/GiftBox";
import Scale from "../public/icons/Scale";
import Money from "../public/icons/money";
import Check from "../public/icons/check";
import ThumbUp from "../public/icons/ThumbUp";
import ThumbDown from "../public/icons/ThumbDown";
import Stack from "../public/icons/stack";

const UpdateStatusDeliveryKurirView = (props) => {
  const [showDetailSuratJalan, setShowDetailSuratJalan] = useState(true);
  const [detailResiClicked, setDetailResiClicked] = useState([]);
  const [deliveryProsesSelect, setDeliveryProsesSelect] = useState("semua");
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalStatusDelivery, setShowModalStatusDelivery] = useState(false);
  const [valueStatusDelivery, setValueStatusDelivery] = useState({});
  const [noResiClicked, setNoResiClicked] = useState("");
  const [noDeliveryClicked, setNoDeliveryClicked] = useState("");
  const [cabangClicked, setCabangClicked] = useState("");
  const [namaKurirClicked, setNamaKurirClicked] = useState("");

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

  const updateClickHandler = (noResi, noDelivery, cabang, kurir) => {
    setShowModalUpdate(true);
    setNoResiClicked(noResi);
    setNoDeliveryClicked(noDelivery);
    setCabangClicked(cabang);
    setNamaKurirClicked(kurir);
  };

  const closeUpdateHandler = () => {
    setShowModalUpdate(false);
    setNoResiClicked("");
    setNoDeliveryClicked("");
    setCabangClicked("");
    setNamaKurirClicked("");
  };

  const statusClickHandler = (val) => {
    setShowModalStatusDelivery(true);
    setValueStatusDelivery(val);
  };

  const closeStatusHandler = () => {
    setShowModalStatusDelivery(false);
    setValueStatusDelivery({});
  };

  const deliveryProsesSelectChange = (e) => {
    setDeliveryProsesSelect(e.target.value);
    setDetailResiClicked([]);
    for (let i = 0; i < document.getElementsByName("card-expand").length; i++) {
      document.getElementsByName("card-expand")[i].style.display = "none";
    }
  };
  return (
    <div className={styles["container"]}>
      {!props.dataDelivery
        ? null
        : props.dataDelivery.map((deliv, index) => (
            <div className={styles["wrapper"]} key={index}>
              <div className={styles["header"]}>
                <span className={styles["noSJ-icon"]}>
                  <Stack />
                </span>
                <span className={styles["noSJ"]}>{deliv.noDelivery}</span>
                <span className={styles["noSJ-icon"]} onClick={suratJalanIconHandler}>
                  <ChevronDown />
                </span>
                <span className={styles["delivery-select"]}>
                  <select
                    name="delivery-proses"
                    id="delivery-proses"
                    value={deliveryProsesSelect}
                    onChange={deliveryProsesSelectChange}
                  >
                    <option value="semua">Semua ({deliv.dataResi.length})</option>
                    <option value="proses">
                      Proses ({deliv.dataResi.filter((d) => d.statusDelivery === "proses").length})
                    </option>
                    <option value="diterima">
                      Diterima ({deliv.dataResi.filter((d) => d.statusDelivery === "diterima").length})
                    </option>
                    <option value="gagal">
                      Gagal ({deliv.dataResi.filter((d) => d.statusDelivery === "gagal").length})
                    </option>
                  </select>
                </span>
              </div>
              {showDetailSuratJalan ? (
                <main className={styles["content"]}>
                  {deliv.dataResi
                    .filter((d) => {
                      if (deliveryProsesSelect === "semua") {
                        return d.statusDelivery !== "";
                      } else {
                        return d.statusDelivery === deliveryProsesSelect;
                      }
                    })
                    .map((resi, index) => (
                      <div className={cardColor(resi.statusDelivery)} key={index}>
                        <section
                          className={
                            detailResiClicked.indexOf(resi.noResi) >= 0
                              ? styles["resi-icon-down"]
                              : styles["resi-icon-up"]
                          }
                          onClick={() => resiIconHandler(resi.noResi)}
                        >
                          {detailResiClicked.indexOf(resi.noResi) >= 0 ? "-" : "+"}
                        </section>
                        <div className={styles["card-title"]}>{resi.namaPenerima}</div>
                        <div>{resi.nohpPenerima}</div>
                        <div>{resi.alamatPenerima}</div>
                        <div id={resi.noResi} name="card-expand" className={styles["card-expand"]}>
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
                            {resi.statusDelivery === "proses" ? (
                              <Button
                                label="Update Status"
                                color="black"
                                icon={<Check />}
                                clickHandler={() =>
                                  updateClickHandler(resi.noResi, deliv.noDelivery, deliv.cabang, deliv.namaKurir)
                                }
                              />
                            ) : null}
                            {resi.statusDelivery === "diterima" ? (
                              <Button
                                label="Terkirim"
                                color="black"
                                icon={<ThumbUp />}
                                clickHandler={() => statusClickHandler(resi)}
                              />
                            ) : null}
                            {resi.statusDelivery === "gagal" ? (
                              <Button
                                label="Gagal Kirim"
                                color="black"
                                icon={<ThumbDown />}
                                clickHandler={() => statusClickHandler(resi)}
                              />
                            ) : null}
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
          cabang={cabangClicked}
          kurir={namaKurirClicked}
          onReset={props.resetInput}
          onSet={props.setInput}
        />
      ) : null}
      {showModalStatusDelivery ? (
        <ModalStatusDelivery onCloseModal={closeStatusHandler} getValue={valueStatusDelivery} />
      ) : null}
    </div>
  );
};

export default UpdateStatusDeliveryKurirView;
