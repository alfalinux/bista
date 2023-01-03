import Head from "next/head";
import RincianTransaksiCabang from "../../../components-app/RincianTransaksiCabang";
import Layouts from "../_layouts";

const RincianTransaksiCabangPage = () => {
  return (
    <div>
      <Head>
        <title>Rincian Transaksi Cabang</title>
      </Head>
      <Layouts>
        <h2 className="main-content-title">Rincian Transaksi Cabang</h2>
        <RincianTransaksiCabang />
      </Layouts>
    </div>
  );
};

export default RincianTransaksiCabangPage;
