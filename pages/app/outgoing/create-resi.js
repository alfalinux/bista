import Head from "next/head";
import InputResi from "../../../components-app/InputResi";
import Layouts from "../_layouts";

const CreateResiPage = () => {
  return (
    <div>
      <Head>
        <title>Create Resi</title>
      </Head>
      <Layouts>
        <h2 className="main-content-title">Form Input Order</h2>
        <InputResi />
      </Layouts>
    </div>
  );
};

export default CreateResiPage;
