import Head from "next/head";
import CekTarif from "../components-user/CekTarif";
import Footer from "../components-user/Footer";
import Info from "../components-user/Info";

const CekTarifPage = () => {
  return (
    <>
      <Head>
        <title>Cek Tarif Bista Cargo</title>
        <meta name="description" content="Tarif Ongkir Bista Cargo Jasa Ekspedisi Kargo Termurah" />
        <meta
          name="keywords"
          content="Kargo Murah, Cargo Murah, Jasa Cargo Murah, Jasa Kargo Murah, Ongkir Termurah, Kargo Surabaya, Angkutan Murah Surabaya, Jasa Kargo Murah Jakarta, Jakarta Cargo, Angkutan Barang Termurah, Angkutan Pindah Rumah, Bista Cargo Pasti Bisa, Tarif Jasa Ekspedisi Termurah Cargo"
        />
      </Head>
      <CekTarif />
      <Info color="#fff" />
      <Footer />
    </>
  );
};

export default CekTarifPage;
