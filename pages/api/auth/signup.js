import { hashPassword } from "../../../helpers/auth";
import { connectDatabase } from "../../../helpers/mongodbConnect";

const handler = async (req, res) => {
  const data = req.body;

  const { nama, posisi, cabang, email, password } = data;

  if (!email || !email.includes("@") || !password || password.trim().length < 6) {
    res.status(422).json({ message: "Invalid Input, cek kembali" });
    client.close();
    return;
  }

  const client = await connectDatabase();

  const db = client.db("bista");

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "email sudah pernah terdaftar" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    nama: nama,
    posisi: posisi,
    cabang: cabang,
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User berhasil didaftarkan" });
  client.close();
};

export default handler;
