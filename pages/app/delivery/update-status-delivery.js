import Head from "next/head";
import UpdateStatusDelivery from "../../../components-app/UpdateStatusDelivery";
import Layouts from "../_layouts";

const UpdateStatusDeliveryPage = () => {
  return (
    <div>
      <Head>
        <title>Update Delivery</title>
      </Head>
      <Layouts>
        <h2 className="main-content-title">Update Status Delivery</h2>
        <UpdateStatusDelivery />
      </Layouts>
    </div>
  );
};

export default UpdateStatusDeliveryPage;
