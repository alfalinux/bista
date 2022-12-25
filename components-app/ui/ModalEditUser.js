import { useState } from "react";
import Swal from "sweetalert2";
import LoginIcon from "../../public/icons/login-icon";
import Button from "./Button";
import styles from "./ModalEditUser.module.css";
import LoadingPage from "./LoadingPage";

const ModalEditUser = (props) => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [inputValue, setInputValue] = useState({
    nama: props.user.nama,
    posisi: props.user.posisi,
    posisiDesc: props.user.posisiDesc,
    cabang: props.user.cabang,
    cabangDesc: props.user.cabangDesc,
    email: props.user.email,
    id: props.user.id,
    password: "",
  });

  const inputChangeHandler = (e) => {
    setInputValue((prevInputValue) => ({ ...prevInputValue, [e.target.name]: e.target.value }));
    if (e.target.name === "posisi") {
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        posisiDesc: e.target.selectedOptions[0].text.toLowerCase(),
      }));
    }
    if (e.target.name === "cabang") {
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        cabangDesc: e.target.selectedOptions[0].text.toLowerCase(),
      }));
    }
  };

  const [touchedField, setTouchedField] = useState({});

  const blurHandler = (e) => {
    setTouchedField({ ...touchedField, [e.target.name]: true });
  };

  const updateHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Update?",
      text: "Apakah anda akan mengupdate data user tersebut?",
      icon: "question",
      showConfirmButton: true,
      confirmButtonColor: "lime",
      confirmButtonText: "Ya, update!",
      showCancelButton: true,
      cancelButtonColor: "red",
      cancelButtonText: "Batalkan!",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoadingPage(true);
        fetch("/api/auth/editUser", {
          method: "PATCH",
          body: JSON.stringify(inputValue),
          headers: { "Content-Type": "application/json" },
        }).then((response) => {
          if (response.status === 201) {
            setIsLoadingPage(false);
            Swal.fire({
              title: "Berhasil",
              text: "Data User Berhasil di Update",
              icon: "success",
              showConfirmButton: false,
              timer: 3000,
            });
            props.onClose();
          } else {
            setIsLoadingPage(false);
            Swal.fire({
              title: "Gagal",
              text: "Data User Tidak Berhasil di Update",
              icon: "error",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        });
      }
    });
  };

  return (
    <div className={styles["container"]}>
      {isLoadingPage ? <LoadingPage /> : null}
      <form className={styles["form-container"]}>
        <div className={styles["field"]}>
          <label htmlFor="nama">Nama Karyawan:</label>
          <input
            type="text"
            id="nama"
            name="nama"
            onBlur={blurHandler}
            onChange={inputChangeHandler}
            data-touched={touchedField.nama}
            value={inputValue.nama}
            placeholder="masukkan nama karyawan..."
            autoComplete="off"
            pattern="[A-Za-z' ]{2,30}"
            required
          />
          <div className="form-reqs">Wajib diisi, maksimal 30 karakter</div>
        </div>
        <div className={styles["field"]}>
          <label htmlFor="posisi">Posisi / Jabatan:</label>
          <select
            name="posisi"
            id="posisi"
            onBlur={blurHandler}
            onChange={inputChangeHandler}
            data-touched={touchedField.posisi}
            defaultValue={inputValue.posisi}
            required
          >
            <option value="" disabled>
              Pilih posisi / jabatan
            </option>
            <option value="ADM">Admin</option>
            <option value="CSO">Customer Service</option>
            <option value="KUR">Kurir</option>
            <option value="DRV">Driver</option>
            <option value="SPR">Sprinter</option>
            <option value="SPV">Supervisor</option>
            <option value="MGR">Manager</option>
            <option value="GEN">General</option>
          </select>
          <div className="form-reqs">Wajib dipilih salah satu</div>
        </div>
        <div className={styles["field"]}>
          <label htmlFor="cabang">Cabang Penempatan:</label>
          <select
            name="cabang"
            id="cabang"
            onBlur={blurHandler}
            onChange={inputChangeHandler}
            data-touched={touchedField.cabang}
            defaultValue={inputValue.cabang}
            required
          >
            <option value="" disabled>
              --Pilih cabang penempatan--
            </option>
            {props.listCabang.length > 0
              ? props.listCabang.map((d, i) => (
                  <option key={i} value={d.tlc}>
                    {d.cab.toUpperCase()}
                  </option>
                ))
              : null}
          </select>
          <div className="form-reqs">Wajib dipilih salah satu</div>
        </div>
        <div className={styles["field"]}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            onBlur={blurHandler}
            onChange={inputChangeHandler}
            data-touched={touchedField.email}
            value={inputValue.email}
            placeholder="masukkan email..."
            autoComplete="off"
            pattern="[a-z0-9.+_-]+@[a-z0-9.+_-]+\.[a-z]{2,}"
            required
          />
          <div className="form-reqs">Wajib diisi dengan email yang valid</div>
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onBlur={blurHandler}
            onChange={inputChangeHandler}
            data-touched={touchedField.password}
            value={inputValue.password}
            placeholder="masukkan password..."
            autoComplete="off"
            pattern="[\S]{6,}"
            required
          />
          <div className="form-reqs">Wajib diisi, minimal 6 karakter</div>
        </div>
        <Button
          label="Update Data"
          color="red"
          icon={<LoginIcon />}
          clickHandler={updateHandler}
          disabled={!Object.values(inputValue).every((val) => val !== "")}
        />
      </form>
      <div className={styles["backdrop"]} onClick={props.onClose}></div>
    </div>
  );
};

export default ModalEditUser;
