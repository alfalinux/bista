import Head from "next/head";
import CreateSuratJalan from "../../../components-app/CreateSuratJalan";
import Layouts from "../_layouts";

const CreateSuratJalanPage = () => {
  return (
    <div>
      <Head>
        <title>Create Surat Jalan</title>
      </Head>
      <Layouts>
        <h2 className="main-content-title">Form Create Surat Jalan</h2>
        <CreateSuratJalan />
      </Layouts>
    </div>
  );
};

export default CreateSuratJalanPage;
