import MainNav from "../../components-user/MainNav";
import Info from "../../components-user/Info";
import Footer from "../../components-user/Footer";
import TrackingResult from "../../components-user/TrackingResult";
import CloseCircle from "../../public/icons/close-circle";

const CekPaketResultPage = (props) => {
  return (
    <div>
      <MainNav />

      <div style={{ width: "100%", backgroundColor: "#000", color: "#fff", display: "flex" }}>
        <div
          style={{
            margin: "50px auto",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid red",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ margin: "0" }}>Cek Posisi Paket</h2>
          <h4>Nomor Resi: {props.noResiSubmitted}</h4>
          {props.dataResi.noResi === "" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                textAlign: "center",
              }}
            >
              <div style={{ color: "red", width: "50px" }}>
                <CloseCircle />
              </div>
              <div>
                Nomor Resi tersebut tidak terdaftar <br></br> Segera hubungi call center atau cabang terdekat
              </div>
            </div>
          ) : (
            <TrackingResult dataResi={props.dataResi} />
          )}
        </div>
      </div>
      <Info />
      <Footer />
    </div>
  );
};

export default CekPaketResultPage;

export async function getServerSideProps(context) {
  const response = await fetch(
    "http://" + context.req.headers.host + "/api/data-resi/cek-resi/" + context.params.noResi
  );
  const data = await response.json();

  return {
    props: {
      dataResi: data,
      noResiSubmitted: context.params.noResi,
    },
  };
}
