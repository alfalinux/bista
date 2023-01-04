import Head from "next/head";
import About from "../components-user/About";
import Footer from "../components-user/Footer";
import Info from "../components-user/Info";
import Jumbotron from "../components-user/Jumbotron";
import Kontak from "../components-user/Kontak";
import MainMenu from "../components-user/MainMenu";
import MainNav from "../components-user/MainNav";

export default function Home() {
  return (
    <>
      <Head>
        <title>Bista Cargo</title>
        <meta name="description" content="Jasa Ekspedisi Kargo Termurah" />
        <meta
          name="keywords"
          content="Kargo Murah, Cargo Murah, Jasa Cargo Murah, Jasa Kargo Murah, Ongkir Termurah, Kargo Surabaya, Angkutan Murah Surabaya, Jasa Kargo Murah Jakarta, Jakarta Cargo, Angkutan Barang Termurah, Angkutan Pindah Rumah, Bista Cargo Pasti Bisa, Tarif Jasa Ekspedisi Termurah Cargo"
        />
        <meta property="og:title" content="Bista Cargo - Jasa Angkutan Profesional" />
        <meta property="og:description" content="Solusi Logistik Terbaik Untuk Bisnis Anda" />
        <meta property="og:image" content="https://bistacargo.com/images/bista-logo-300.png" />
        <meta property="og:url" content="https://www.bistacargo.com" />
      </Head>
      <MainNav />
      <Jumbotron />
      <MainMenu />
      <About />
      <Kontak />
      <Info color="#000" />
      <Footer />
    </>
  );
}
