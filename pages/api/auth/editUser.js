import { hashPassword } from "../../../helpers/auth";
import { connectDatabase } from "../../../helpers/mongodbConnect";

const handler = async (req, res) => {
  const data = req.body;

  if (req.method !== "PATCH") {
    return;
  }

  const client = await connectDatabase();

  const db = client.db("bista");

  const hashedPassword = await hashPassword(data.password);

  const result = await db.collection("users").updateOne(
    { email: data.email },
    {
      $set: {
        id: data.id,
        nama: data.nama,
        posisi: data.posisi,
        posisiDesc: data.posisiDesc,
        cabang: data.cabang,
        cabangDesc: data.cabangDesc,
        email: data.email,
        password: hashedPassword,
      },
    }
  );

  res.status(201).json({ message: "Data user berhasil diupdate!" });
  client.close();
};

export default handler;
