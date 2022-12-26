import ResiActive from "../../../components-app/data-monitoring/ResiActive";
import Layouts from "../_layouts";

const ResiActivePage = () => {
  return (
    <div>
      <Layouts>
        <h2 className="main-content-title">Daftar Resi Aktif</h2>
        <ResiActive />
      </Layouts>
    </div>
  );
};

export default ResiActivePage;
