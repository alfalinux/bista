const EditHargaPage = () => {
  const harga = {
    jakarta: [
      { id: "one", cab: "jakarta" },
      { id: "two", cab: "bandung" },
      { id: "three", cab: "solo" },
    ],
  };

  const submitPricingHandler = (e) => {
    e.preventDefault();
    fetch("/api/pricing/insert-pricing", {
      method: "POST",
      body: JSON.parse(),
    });
  };

  return (
    <div>
      <div>upload harga</div>
      <button onClick={submitPricingHandler}>submit</button>
    </div>
  );
};

export default EditHargaPage;
