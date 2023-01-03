const getDate = (date) => {
  const tgl = new Date(date).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return tgl;
};

export default getDate;
