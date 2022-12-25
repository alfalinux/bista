import { connectDatabase, findUser } from "../../../helpers/mongodbConnect";

const handler = async (req, res) => {
  if (req.method === "GET") {
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
      result = await findUser(client, "users");
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Data user cabang tidak ditemukan" });
      return;
    }
    res.status(201).json(result);
  }
};

export default handler;
