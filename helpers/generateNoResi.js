const generateNoResi = (cab, user) => {
  const cabang = cab.toUpperCase();
  const userId = user.toUpperCase();
  const date = new Date();
  const tahun = date.getFullYear().toString().slice(-2);
  const bulan = (date.getMonth() + 1).toString();
  const tanggal = date.getDate().toString();
  const jam = ("0" + date.getHours().toString()).slice(-2);
  const menit = ("0" + date.getMinutes().toString()).slice(-2);
  const detik = ("0" + date.getSeconds().toString()).slice(-2);
  return cabang + userId + tahun + bulan + tanggal + jam + menit + detik;
};

export default generateNoResi;
