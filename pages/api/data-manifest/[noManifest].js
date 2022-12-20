import { connectDatabase, findManifest } from "../../../helpers/mongodbConnect";

const handler = async (req, res) => {
  const { noManifest } = req.query;
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    client.close();
    res.status(500).json({ message: "Gagal terhubung ke database" });
    return;
  }

  let result;
  try {
    result = await findManifest(client, "dataManifest", noManifest);
  } catch (error) {
    client.close();
    res.status(500).json({ message: "Nomor Manifest tidak ditemukan" });
    return;
  }
  res.status(201).json(result);
};

export default handler;
