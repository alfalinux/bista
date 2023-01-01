import Head from "next/head";
import ResiActive from "../../../components-app/data-monitoring/ResiActive";
import Layouts from "../_layouts";

const ResiActivePage = () => {
  return (
    <div>
      <Head>
        <title>Resi Aktif</title>
      </Head>
      <Layouts>
        <h2 className="main-content-title">Daftar Resi Aktif</h2>
        <ResiActive />
      </Layouts>
    </div>
  );
};

export default ResiActivePage;
