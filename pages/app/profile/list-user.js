import Head from "next/head";
import ListUser from "../../../components-app/ListUser";
import Layouts from "../_layouts";

const ChangePasswordPage = () => {
  return (
    <div>
      <Head>
        <title>List User</title>
      </Head>
      <Layouts>
        <h2 className="main-content-title">List User Registered</h2>
        <ListUser />
      </Layouts>
    </div>
  );
};

export default ChangePasswordPage;
