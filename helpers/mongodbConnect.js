import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb://admin:4dmin@ac-uyzhd6y-shard-00-00.qsklzwd.mongodb.net:27017,ac-uyzhd6y-shard-00-01.qsklzwd.mongodb.net:27017,ac-uyzhd6y-shard-00-02.qsklzwd.mongodb.net:27017/?ssl=true&replicaSet=atlas-yzfdd6-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  return client;
};

export const getAllDatabase = async (client, collection, sort) => {
  const db = client.db("bista");
  const result = await db.collection(collection).find().sort(sort).toArray();

  return result;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db("bista");
  const result = await db.collection(collection).insertOne(document);

  return result;
};

// ---- UPDATE ----

export const updateManyResi = async (client, collection, filter, update) => {
  const db = client.db("bista");
  const result = await db.collection(collection).updateMany({ noResi: { $in: filter } }, { $set: update });

  return result;
};

export const updateManyResiByDelivery = async (client, collection, filter, update) => {
  const db = client.db("bista");
  const result = await db
    .collection(collection)
    .updateMany({ noResi: { $in: filter } }, { $push: { delivery: update } });

  return result;
};

export const updateManyManifest = async (client, collection, filter, update) => {
  const db = client.db("bista");
  const result = await db
    .collection(collection)
    .updateMany({ noManifest: { $in: filter } }, { $push: { suratJalan: update.suratJalan[0] } });

  return result;
};

export const updateReceiveManifest = async (client, collection, filter, update) => {
  const db = client.db("bista");
  const result = await db
    .collection(collection)
    .updateMany(
      { noManifest: { $in: filter } },
      { $set: { receivedIn: update.receivedIn, receivedAt: update.receivedAt, receivedBy: update.receivedBy } }
    );

  return result;
};

export const updateManyManifestBySuratJalan = async (client, collection, filter, update) => {
  const db = client.db("bista");
  const result = await db.collection(collection).updateMany(
    { noManifest: { $in: filter.noManifest }, "suratJalan.noSuratJalan": filter.noSuratJalan },
    {
      $set: {
        "suratJalan.$.receivedIn": update.receivedIn,
        "suratJalan.$.receivedAt": update.receivedAt,
        "suratJalan.$.receivedBy": update.receivedBy,
      },
    }
  );

  return result;
};

export const updateSuratJalan = async (client, collection, filter, update) => {
  const db = client.db("bista");
  const result = await db.collection(collection).updateOne({ noSuratJalan: filter.noSuratJalan }, { $set: update });

  return result;
};

// ---- GET DATA ----

export const findUserCabang = async (client, collection, cabang) => {
  const db = client.db("bista");
  const getData = await db.collection(collection).find({ cabang: cabang }).toArray();
  const result = getData.map((d) => ({ nama: d.nama, posisi: d.posisi, cabang: d.cabang, email: d.email, id: d.id }));
  return result;
};

export const findResi = async (client, collection, noResi) => {
  const db = client.db("bista");
  const result = await db.collection(collection).findOne({ noResi: noResi });
  return result;
};

export const findResiBelumDelivery = async (client, collection, cabangTujuan) => {
  const db = client.db("bista");
  const result = await db
    .collection(collection)
    .find({
      $or: [
        {
          cabangAsal: cabangTujuan,
          "dataOngkir.cov": cabangTujuan,
          $or: [{ delivery: null }, { "delivery.status": { $nin: ["proses", "diterima"] } }],
        },
        {
          "dataOngkir.cov": cabangTujuan,
          manifestReceivedAt: { $ne: null },
          $or: [{ delivery: null }, { "delivery.status": { $nin: ["proses", "diterima"] } }],
        },
      ],
    })
    .toArray();
  return result;
};

export const findResiBelumManifest = async (client, collection, cabangAsal) => {
  const db = client.db("bista");
  const result = await db.collection(collection).find({ cabangAsal: cabangAsal, noManifest: null }).toArray();
  return result;
};

export const findResiBelumUpdateStatus = async (client, collection, cabang) => {
  const db = client.db("bista");
  const result = await db
    .collection(collection)
    .find({ "dataOngkir.cov": cabang, delivery: { $elemMatch: { status: "proses" } } })
    .toArray();
  return result;
};

export const findManifestBelumSuratJalan = async (client, collection, cabangAsal) => {
  const db = client.db("bista");
  const result = await db.collection(collection).find({ cabangAsal: cabangAsal, suratJalan: null }).toArray();

  return result;
};

export const findManifestTransit = async (client, collection, cabangTujuan) => {
  const db = client.db("bista");
  const result = await db
    .collection(collection)
    .find({ "suratJalan.receivedIn": cabangTujuan, "suratJalan.cabangAsal": { $ne: cabangTujuan } })
    .toArray();

  return result;
};

export const findSuratJalanBelumReceive = async (client, collection, cabangTujuan) => {
  const db = client.db("bista");
  const result = await db.collection(collection).find({ cabangTujuan: cabangTujuan, receivedIn: null }).toArray();

  return result;
};

export const findManifestBelumReceive = async (client, collection, cabangTujuan) => {
  const db = client.db("bista");
  const result = await db
    .collection(collection)
    .find({ coveranArea: cabangTujuan, receivedIn: null, suratJalan: { $ne: null } })
    .toArray();

  return result;
};

export const findManifestInSuratJalan = async (client, collection, noManifest) => {
  const db = client.db("bista");
  const result = await db
    .collection(collection)
    .find({ dataManifest: { $elemMatch: { noManifest: { $in: noManifest } } } })
    .toArray();

  return result;
};

export const findDeliveryOnProses = async (client, collection, namaKurir) => {
  const db = client.db("bista");
  const result = await db.collection(collection).find({ namaKurir: namaKurir, status: "proses" }).toArray();

  return result;
};
