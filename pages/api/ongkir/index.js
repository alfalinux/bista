import fs from "fs";
import path from "path";
import { sendParams } from "../../../components/InputResi";

const handler = (req, res) => {
  if (sendParams.asal === "" || sendParams.tujuan === "") {
    return res.status(500);
  } else {
    const filePath = path.join(process.cwd(), "data", "ongkir", `${sendParams.asal}.json`);
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    // const dataOngkir = data.bengkulu.filter((d) => d.id === sendParams.tujuan.id);
    res.status(201).json({ ongkir: data });
  }
};

export default handler;
