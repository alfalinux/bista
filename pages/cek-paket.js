import Head from "next/head";
import CekPaket from "../components-user/CekPaket";
import Footer from "../components-user/Footer";
import Info from "../components-user/Info";

const CekPaketPage = () => {
  return (
    <>
      <Head>
        <title>Cek Paket Bista Cargo</title>
        <meta name="description" content="Cek Paket Bista Cargo Tracking Jasa Ekspedisi Kargo Termurah" />
        <meta
          name="keywords"
          content="Kargo Murah, Cargo Murah, Jasa Cargo Murah, Jasa Kargo Murah, Ongkir Termurah, Kargo Surabaya, Angkutan Murah Surabaya, Jasa Kargo Murah Jakarta, Jakarta Cargo, Angkutan Barang Termurah, Angkutan Pindah Rumah, Bista Cargo Pasti Bisa, Tarif Jasa Ekspedisi Termurah Cargo"
        />
      </Head>
      <CekPaket />
      <Info color="#fff" />
      <Footer />
    </>
  );
};

export default CekPaketPage;
