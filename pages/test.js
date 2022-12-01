import { useState, useEffect } from "react";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";

const Test = () => {
  const [cabangAsal, setCabangAsal] = useState("");
  const [cabangTujuan, setCabangTujuan] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [getData, setGetData] = useState([]);
  const [filteredKecamatan, setFilteredKecamatan] = useState("");

  useEffect(() => {
    fetch("/api/kecamatan")
      .then((response) => response.json())
      .then((data) => setGetData(data.kecamatan));
  }, []);

  const cabangAsalChange = (e) => {
    setCabangAsal(e.target.value);
  };
  const cabangTujuanChange = (e) => {
    setCabangTujuan(e.target.value);
  };
  const tujuanChange = (e) => {
    setTujuan(e.target.value);
  };

  const kecamatanChange = (e) => {
    setFilteredKecamatan(e);
  };

  console.log(cabangAsal, cabangTujuan, tujuan, filteredKecamatan);

  // const options = [
  //   { name: "Swedish", value: { val: "sv" }, key: "1" },
  //   { name: "English", value: { val: "en" }, key: "2" },
  //   { name: "Indonesia", value: { val: "id" }, key: "3" },
  //   { name: "India", value: { val: "in" }, key: "4" },
  // ];

  const options = getData.map((d) => ({ value: d.id, name: d.kec + " - " + d.ibukota + " - " + d.kabkot }));

  // function getOptions() {
  //   // fetch(`/api/kecamatan`)
  //   //   .then((response) => response.json())
  //   //   .then((data) => console.log(data));
  //   return new Promise((resolve, reject) => {
  //     fetch(`/api/kecamatan`)
  //       .then((response) => response.json())
  //       .then(({ kecamatan }) => {
  //         resolve(kecamatan.map((d) => ({ value: d.id, name: d.kec })));
  //       })
  //       .catch(reject);
  //   });
  // }

  return (
    <div>
      <form>
        <div>
          <label htmlFor="cabangAsal">Cabang Asal</label>
          <input type="text" name="cabangAsal" onChange={cabangAsalChange} />
        </div>
        <div>
          <label htmlFor="tujuan">Tujuan Kecamatan</label>
          <select name="tujuan" id="tujuan" onChange={tujuanChange}>
            <option value="ratuagung">Ratu Agung</option>
            <option value="ratusamban">Ratu Samban</option>
            <option value="pagardewa">Pagar Dewa</option>
          </select>
        </div>
        <div>
          <SelectSearch
            value={filteredKecamatan}
            options={options}
            placeholder="Choose your language"
            search={true}
            onChange={kecamatanChange}
          />
        </div>
        <div>
          <label htmlFor="cabangTujuan">Cabang Tujuan</label>
          <input type="text" name="cabangTujuan" onChange={cabangTujuanChange} />
        </div>
      </form>
    </div>
  );
};

export default Test;
