import styles from "./SignupUser.module.css";
import LoginIcon from "../public/icons/login-icon";
import LoadingSpinner from "../public/icons/loading-spinner";
import { useState } from "react";

async function createUser(nama, posisi, cabang, email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ nama, posisi, cabang, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Terjadi kesalahan");
  }

  return data;
}

const SignupUser = () => {
  const [touchedField, setTouchedField] = useState({});
  const [signupSuccess, setSignupSuccess] = useState("");
  const [signupFailed, setSignupFailed] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const blurHandler = (e) => {
    setTouchedField({ ...touchedField, [e.target.name]: true });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const result = await createUser(data.nama, data.posisi, data.cabang, data.email, data.password);
      setSignupSuccess(result.message);
    } catch (error) {
      setSignupFailed(error.message);
    }
    setShowLoading(false);
  };

  return (
    <form onSubmit={signupHandler} className={styles["container"]}>
      <div className={styles["field"]}>
        <label htmlFor="nama">Nama Karyawan:</label>
        <input
          type="text"
          id="nama"
          name="nama"
          placeholder="masukkan nama karyawan..."
          autoComplete="off"
          onBlur={blurHandler}
          data-touched={touchedField.nama}
          pattern="[A-Za-z' ]{2,30}"
          required
        />
        <div className="form-reqs">Wajib diisi, maksimal 30 karakter</div>
      </div>
      <div className={styles["field"]}>
        <label htmlFor="posisi">Posisi / Jabatan:</label>
        <select name="posisi" id="posisi" onBlur={blurHandler} data-touched={touchedField.posisi} required>
          <option value="">Pilih posisi / jabatan</option>
          <option value="adm">Admin</option>
          <option value="cso">Customer Service</option>
          <option value="kur">Kurir</option>
          <option value="drv">Driver</option>
          <option value="spr">Sprinter</option>
          <option value="spv">Supervisor</option>
          <option value="mgr">Manager</option>
          <option value="superuser">Super User</option>
        </select>
        <div className="form-reqs">Wajib dipilih salah satu</div>
      </div>
      <div className={styles["field"]}>
        <label htmlFor="cabang">Cabang Penempatan:</label>
        <select name="cabang" id="cabang" onBlur={blurHandler} data-touched={touchedField.cabang} required>
          <option value="">--Pilih cabang penempatan--</option>
          <option value="bku">Bengkulu</option>
          <option value="jkt">Jakarta</option>
          <option value="intim">Indonesia Timur</option>
          <option value="inbar">Indonesia Barat</option>
          <option value="inteng">Indonesia Tengah</option>
          <option value="general">General</option>
        </select>
        <div className="form-reqs">Wajib dipilih salah satu</div>
      </div>
      <div className={styles["field"]}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="masukkan email..."
          autoComplete="off"
          onBlur={blurHandler}
          data-touched={touchedField.email}
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
          placeholder="masukkan password..."
          autoComplete="off"
          onBlur={blurHandler}
          data-touched={touchedField.password}
          pattern="[\S]{6,}"
          required
        />
        <div className="form-reqs">Wajib diisi, minimal 6 karakter</div>
      </div>
      {showLoading ? (
        <div className={styles["loading-icon"]}>
          <LoadingSpinner />
        </div>
      ) : signupFailed ? (
        <div className={styles["loading-icon"]}>{signupFailed}</div>
      ) : signupSuccess ? (
        <div className={styles["loading-icon"]}>{signupSuccess}</div>
      ) : (
        <button className={styles["btn"]}>
          <p>Daftarkan!</p>
          <LoginIcon />
        </button>
      )}
    </form>
  );
};

export default SignupUser;