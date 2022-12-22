import { connectDatabase, findDelivery } from "../../../helpers/mongodbConnect";

const handler = async (req, res) => {
  const { noDelivery } = req.query;
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
    result = await findDelivery(client, "dataDelivery", noDelivery);
  } catch (error) {
    client.close();
    res.status(500).json({ message: "Nomor Delivery tidak ditemukan" });
    return;
  }
  res.status(201).json(result);
};

export default handler;
