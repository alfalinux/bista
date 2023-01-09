import { connectDatabase } from "../../../helpers/mongodbConnect";

const handler = async (req, res) => {
  const { cabang } = req.body;
  console.log(cabang);
  // let client;
  // try {
  //   client = await connectDatabase();
  // } catch (error) {
  //   res.status(500).json({ message: "Gagal terhubung ke database" });
  //   return;
  // }

  // if (req.method !== "POST") {
  //   res.status(405).json({ message: "Kami merekam data Anda yang mencoba melakukan tindakan mencurigakan" });
  //   return;
  // }

  // const db = client.db("bista");
  // let importData;

  // try {
  //   importData = await db.collection("ongkir").insertOne({});
  // } catch (error) {
  //   importData = null;
  // }
};

export default handler;
