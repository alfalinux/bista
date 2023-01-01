import Head from "next/head";
import CreateDelivery from "../../../components-app/CreateDelivery";
import Layouts from "../_layouts";

const CreateDeliveryPage = () => {
  return (
    <div>
      <Head>
        <title>Create Delivery</title>
      </Head>
      <Layouts>
        <h2 className="main-content-title">Create Delivery</h2>
        <CreateDelivery />
      </Layouts>
    </div>
  );
};

export default CreateDeliveryPage;
