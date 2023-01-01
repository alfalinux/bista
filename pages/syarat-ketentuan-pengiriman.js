import Head from "next/head";
import Footer from "../components-user/Footer";
import Info from "../components-user/Info";
import MainNav from "../components-user/MainNav";
import SyaratKetentuanPengiriman from "../components-user/SyaratKetentuanPengiriman";

export default function Home() {
  return (
    <>
      <Head>
        <title>Syarat Pengiriman Bista Cargo</title>
        <meta
          name="description"
          content="Syarat Ketentuan Pengiriman Paket Barang Bista Cargo Jasa Ekspedisi Kargo Termurah"
        />
        <meta
          name="keywords"
          content="Kargo Murah, Cargo Murah, Jasa Cargo Murah, Jasa Kargo Murah, Ongkir Termurah, Kargo Surabaya, Angkutan Murah Surabaya, Jasa Kargo Murah Jakarta, Jakarta Cargo, Angkutan Barang Termurah, Angkutan Pindah Rumah, Bista Cargo Pasti Bisa, Tarif Jasa Ekspedisi Termurah Cargo"
        />
      </Head>
      <MainNav />
      <SyaratKetentuanPengiriman />
      <Info color="#000" />
      <Footer />
    </>
  );
}
