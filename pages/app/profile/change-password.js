import Head from "next/head";
import ChangePassword from "../../../components-app/ChangePassword";
import Layouts from "../_layouts";

const ChangePasswordPage = () => {
  return (
    <div>
      <Head>
        <title>Ubah Password</title>
      </Head>
      <Layouts>
        <h2 className="main-content-title">Form Ganti Password</h2>
        <ChangePassword />
      </Layouts>
    </div>
  );
};

export default ChangePasswordPage;
