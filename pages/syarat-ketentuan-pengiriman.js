import Footer from "../components-user/Footer";
import Info from "../components-user/Info";
import MainNav from "../components-user/MainNav";
import SyaratKetentuanPengiriman from "../components-user/SyaratKetentuanPengiriman";

export default function Home() {
  return (
    <>
      <MainNav />
      <SyaratKetentuanPengiriman />
      <Info />
      <Footer />
    </>
  );
}
