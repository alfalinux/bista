import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../helpers/auth";
import { connectDatabase } from "../../../helpers/mongodbConnect";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectDatabase();
        const db = client.db("bista");
        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("email tidak terdaftar");
        }

        const isValid = await verifyPassword(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Password tidak sesuai!");
        }

        return { nama: user.nama, posisi: user.posisi, cabang: user.cabanag, email: user.email };

        client.close();
      },
    }),
  ],
});
