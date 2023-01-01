import Head from "next/head";
import CreateManifest from "../../../components-app/CreateManifest";
import Layouts from "../_layouts";

const CreateManifestPage = () => {
  return (
    <div>
      <Head>
        <title>Create Manifest</title>
      </Head>
      <Layouts>
        <h2 className="main-content-title">Form Create Manifest</h2>
        <CreateManifest />
      </Layouts>
    </div>
  );
};

export default CreateManifestPage;
