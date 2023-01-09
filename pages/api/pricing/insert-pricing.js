import { connectDatabase } from "../../../helpers/mongodbConnect";

const handler = async (req, res) => {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Gagal terhubung ke database" });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ message: "Kami merekam data Anda yang mencoba melakukan tindakan mencurigakan" });
    return;
  }

  const db = client.db("bista");
  let importData;

  try {
    importData = await db.collection("ongkir").insertOne({ surabaya: JSON.parse(req.body) });
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Gagal menyimpan ke database" });
    return;
  }

  res.status(201).json(importData);
};

export default handler;
