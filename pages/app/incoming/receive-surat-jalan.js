import Head from "next/head";
import ReceiveSuratJalan from "../../../components-app/ReceiveSuratJalan";
import Layouts from "../_layouts";

const ReceiveSuratJalanPage = () => {
  return (
    <div>
      <Head>
        <title>Receive Surat Jalan</title>
      </Head>
      <Layouts>
        <h2 className="main-content-title">Surat Jalan Incoming</h2>
        <ReceiveSuratJalan />
      </Layouts>
    </div>
  );
};

export default ReceiveSuratJalanPage;
