import { connectDatabase, getDataResiByDate } from "../../../../helpers/mongodbConnect";

const handler = async (req, res) => {
  const cabang = req.query.cabang[0];
  const tglAwal = req.query.cabang[1];
  const tglAkhir = req.query.cabang[2];

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Gagal terhubung ke database" });
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ message: "Kami merekam data Anda yang mencoba melakukan tindakan mencurigakan" });
    return;
  }

  if (tglAwal > tglAkhir) {
    res.status(412).json({ message: "Tanggal Awal harus lebih kecil atau sama dengan tanggal Akhir" });
    return;
  }

  let result;
  try {
    result = await getDataResiByDate(client, "dataResi", { cabang, tglAwal, tglAkhir });
  } catch (error) {
    client.close();
    res.status(500).json({ message: "Data Resi tidak ditemukan" });
    return;
  }

  if (result.length === 0) {
    res.status(201).json({ message: "Tidak ada transaksi pada cabang dan periode tersebut", result: result });
  } else {
    res.status(201).json({ message: "sukses", result: result });
  }
};

export default handler;
