import Head from "next/head";
import SignupUser from "../../../components-app/SignupUser";
import Layouts from "../_layouts";

const RegistrasiUserPage = () => {
  return (
    <div>
      <Head>
        <title>Registrasi User</title>
      </Head>
      <Layouts>
        <h2 className="main-content-title">Form Pendaftaran User Baru</h2>
        <SignupUser />
      </Layouts>
    </div>
  );
};

export default RegistrasiUserPage;
