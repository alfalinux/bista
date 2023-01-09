const EditHargaPage = () => {
  //   const surabaya = [
  //     {
  //       id: "1901",
  //       prov: "Daerah Khusus Ibukota Jakarta",
  //       tlc: "KSU",
  //       kabkot: "Kepulauan Seribu",
  //       ibukota: "Kepulauan Seribu Utara",
  //       kec: "Kepulauan Seribu Selatan",
  //       cov: "jakarta",
  //       covTlc: "JKT",
  //       cargo: "3000",
  //       minCargo: "30",
  //       slaCargo: "3",
  //       express: "",
  //       minExpress: "",
  //       slaExpress: "",
  //     },
  //   ];

  const submitPricingHandler = (e) => {
    e.preventDefault();
    // fetch("/api/pricing/insert-pricing", {
    //   method: "POST",
    //   body: JSON.stringify(surabaya),
    // });
  };

  return (
    <div>
      <div>upload harga</div>
      <button onClick={submitPricingHandler}>submit</button>
    </div>
  );
};

export default EditHargaPage;
