import Head from "next/head";
import SuratJalanActive from "../../../components-app/data-monitoring/SuratJalanActive";
import Layouts from "../_layouts";

const ResiActivePage = () => {
  return (
    <div>
      <Head>
        <title>Surat Jalan Aktif</title>
      </Head>
      <Layouts>
        <h2 className="main-content-title">Daftar Surat Jalan Aktif</h2>
        <SuratJalanActive />
      </Layouts>
    </div>
  );
};

export default ResiActivePage;
