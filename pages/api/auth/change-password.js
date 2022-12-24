import { getSession } from "next-auth/react";
import { hashPassword, verifyPassword } from "../../../helpers/auth";
import { connectDatabase } from "../../../helpers/mongodbConnect";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Silakan login terlebih dahulu" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectDatabase();
  const db = client.db("bista");
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(401).json({ message: "email tidak terdaftar" });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const matchPassword = await verifyPassword(oldPassword, currentPassword);

  if (!matchPassword) {
    res.status(403).json({ message: "password tidak cocok" });
    client.close();
    return;
  }

  const newHashedPassword = await hashPassword(newPassword);

  const updatePassword = await usersCollection.updateOne(
    { email: user.email },
    { $set: { password: newHashedPassword } }
  );

  res.status(201).json({ message: "Password is update", updatePassword });
  client.close();
}

export default handler;
