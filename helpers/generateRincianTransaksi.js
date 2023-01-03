const generateRincianTransaksi = (arrayTransaksi) => {
  const template = [
    [
      "No Resi",
      "Tgl Transaksi",
      "Nama Pengirim",
      "Nama Penerima",
      "Cabang Asal",
      "Cabang Coveran",
      "Kec. Tujuan",
      "Kota Tujuan",
      "Prov. Tujuan",
      "Layanan",
      "Pembayaran",
      "Jlh Paket",
      "Total Berat",
      "Ongkir per-Kg",
      "By Packing",
      "By Surat",
      "By Asuransi",
      "Diskon",
      "Total Omset",
      "Petugas Input",
    ],
  ];

  const content = arrayTransaksi.map((d) => [
    d.noResi,
    new Date(d.tglTransaksi).toLocaleString("en-UK"),
    d.namaPengirim,
    d.namaPenerima,
    d.cabangAsal.toUpperCase(),
    d.dataOngkir.cov.toUpperCase(),
    d.dataOngkir.kec.toUpperCase(),
    d.dataOngkir.kabkot.toUpperCase(),
    d.dataOngkir.prov.toUpperCase(),
    d.layanan.toUpperCase(),
    d.pembayaran.toUpperCase(),
    Number(d.jumlahBarang),
    Number(d.beratBarang),
    Number(d.ongkirPerkilo),
    Number(d.biayaPacking),
    Number(d.biayaSurat),
    Number(d.biayaAsuransi),
    Number(d.diskon) / 100,
    Number(d.grandTotal),
    d.petugasInput,
  ]);

  return [...template, ...content];
};

export default generateRincianTransaksi;
