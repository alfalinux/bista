import Layouts from "../_layouts";
import SignupUser from "../../../components-app/SignupUser";

const ProfilPage = () => {
  return (
    <div>
      <Layouts>
        <h2 className="main-content-title">Form Pendaftaran User Baru</h2>
        <SignupUser />
      </Layouts>
    </div>
  );
};

export default ProfilPage;
