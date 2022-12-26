import ManifestActive from "../../../components-app/data-monitoring/ManifestActive";
import Layouts from "../_layouts";

const ResiActivePage = () => {
  return (
    <div>
      <Layouts>
        <h2 className="main-content-title">Daftar Manifest Aktif</h2>
        <ManifestActive />
      </Layouts>
    </div>
  );
};

export default ResiActivePage;
