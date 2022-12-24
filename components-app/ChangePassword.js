import { signOut, useSession } from "next-auth/react";
import styles from "./ChangePassword.module.css";
import Button from "../components-app/ui/Button";
import EyeSlash from "../public/icons/eye-slash";
import Eye from "../public/icons/eye";
import LockClosed from "../public/icons/lock-closed";
import { useState } from "react";
import Swal from "sweetalert2";
import LoadingPage from "../components-app/ui/LoadingPage";

const ChangePassword = () => {
  const { data, status } = useSession();
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [showPasswordLama, setShowPasswordLama] = useState(false);
  const [showPasswordBaru, setShowPasswordBaru] = useState(false);
  const [passwordLamaInput, setPasswordLamaInput] = useState("");
  const [passwordBaruInput, setPasswordBaruInput] = useState("");

  const onPasswordLamaChange = (e) => {
    setPasswordLamaInput(e.target.value);
  };

  const onPasswordBaruChange = (e) => {
    setPasswordBaruInput(e.target.value);
  };

  const onEyeLamaClicked = (e) => {
    setShowPasswordLama(!showPasswordLama);
  };

  const onEyeBaruClicked = (e) => {
    setShowPasswordBaru(!showPasswordBaru);
  };

  const submitPasswordHandler = (e) => {
    const oldPassword = passwordLamaInput;
    const newPassword = passwordBaruInput;

    Swal.fire({
      title: "Anda Yakin?",
      text: "Pastikan Anda ingat Password yang Baru!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "Batalkan",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ya, Ganti Password!",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoadingPage(true);
        fetch("/api/auth/change-password", {
          method: "PATCH",
          body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          setIsLoadingPage(false);
          if (response.status === 401) {
            Swal.fire({
              title: "Gagal",
              text: "Email tidak terdaftar",
              icon: "error",
              showCloseButton: true,
            });
          }
          if (response.status === 403) {
            Swal.fire({
              title: "Gagal",
              text: "Password Lama Tidak Sesuai",
              icon: "error",
              showCloseButton: true,
            });
          }
          if (response.status === 201) {
            Swal.fire({
              title: "Berhasil",
              text: "Password telah diganti",
              icon: "success",
              showCloseButton: true,
            }).then((response) => {
              signOut();
            });
          }
        });
      }
    });
  };

  return (
    <div className={styles["container"]}>
      {isLoadingPage ? <LoadingPage /> : null}
      <div className={styles["wrapper"]}>
        <label htmlFor="nama">Nama</label>
        <input type="text" id="nama" name="nama" value={!data ? "" : data.nama} readOnly />
        <label htmlFor="userId">User ID</label>
        <input
          type="text"
          id="userId"
          name="userId"
          value={!data ? "" : data.cabang.toUpperCase() + data.posisi.toUpperCase() + data.id}
          readOnly
        />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" value={!data ? "" : data.email} readOnly />
        <label htmlFor="cabang">Cabang</label>
        <input type="text" id="cabang" name="cabang" value={!data ? "" : data.cabangDesc.toUpperCase()} readOnly />
        <label htmlFor="posisi">Posisi</label>
        <input type="text" id="posisi" name="posisi" value={!data ? "" : data.posisiDesc.toUpperCase()} readOnly />
        <label htmlFor="passwordLama">Password Lama</label>
        <div className={styles["password-field"]}>
          <input
            type={showPasswordLama ? "text" : "password"}
            id="passwordLama"
            name="passwordLama"
            className={styles["password-field__input"]}
            onChange={onPasswordLamaChange}
            value={passwordLamaInput}
            required
          />
          <span
            id="passwordLama"
            name="passwordLama"
            className={styles["password-field__icon"]}
            onClick={onEyeLamaClicked}
          >
            {showPasswordLama ? <Eye /> : <EyeSlash />}
          </span>
        </div>
        <label htmlFor="passwordBaru">Password Baru</label>
        <div className={styles["password-field"]}>
          <input
            type={showPasswordBaru ? "text" : "password"}
            id="passwordBaru"
            name="passwordBaru"
            className={styles["password-field__input"]}
            onChange={onPasswordBaruChange}
            value={passwordBaruInput}
            required
          />
          <span
            id="passwordBaru"
            name="passwordBaru"
            className={styles["password-field__icon"]}
            onClick={onEyeBaruClicked}
          >
            {showPasswordBaru ? <Eye /> : <EyeSlash />}
          </span>
        </div>
        <div></div>
        <Button
          height="40px"
          label="Ganti Password"
          color="red"
          width="quarter"
          icon={<LockClosed />}
          clickHandler={submitPasswordHandler}
          disabled={passwordBaruInput === "" || passwordLamaInput === ""}
        />
      </div>
    </div>
  );
};

export default ChangePassword;
