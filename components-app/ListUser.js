import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import styles from "./ListUser.module.css";
import LoadingSpinner from "../public/icons/loading-spinner";
import Refresh from "../public/icons/refresh";
import Button from "./ui/Button";
import ModalEditUser from "./ui/ModalEditUser";

const ListUser = () => {
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [listCabang, setListCabang] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [cabangSelected, setCabangSelected] = useState("");
  const [showModalEditUser, setShowModalEditUser] = useState(false);
  const [userSelected, setUserSelected] = useState({});

  useEffect(() => {
    setIsLoading(true);
    if (status !== "authenticated") {
      return;
    }

    fetch("/api/cabang")
      .then((response) => response.json())
      .then((data) => {
        setListCabang(data);
        setIsLoading(false);
      });
  }, [status]);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/users/all-user")
      .then((response) => response.json())
      .then((data) => {
        let userFiltered;
        cabangSelected === ""
          ? (userFiltered = data)
          : (userFiltered = data.filter((d) => d.cabangDesc === cabangSelected));

        setListUser(userFiltered);
        setIsLoading(false);
      });
  }, [cabangSelected, showModalEditUser]);

  const cabangChangeHandler = (e) => {
    setCabangSelected(e.target.value);
  };

  const editClickHandler = (user) => {
    setShowModalEditUser(true);
    setUserSelected(user);
  };

  const closeModalHandler = () => {
    setShowModalEditUser(false);
    setUserSelected({});
  };

  return (
    <div className={styles["container"]}>
      {status === "authenticated" ? (
        <div className={styles["cabang-option"]}>
          <label htmlFor="cabang">Cabang</label>
          <select name="cabang" id="cabang" defaultValue="" onChange={cabangChangeHandler}>
            <option value="" disabled>
              --pilih cabang--
            </option>
            {data.posisi === "GEN"
              ? listCabang.map((d, i) => (
                  <option key={i} value={d.cab}>
                    {d.cab.toUpperCase()}
                  </option>
                ))
              : listCabang
                  .filter((d) => d.tlc === data.cabang)
                  .map((d, i) => (
                    <option key={i} value={d.cab}>
                      {d.cab.toUpperCase()}
                    </option>
                  ))}
          </select>
        </div>
      ) : null}

      {/* -- Display Table Manifest INCOMING -- */}
      <table className="table-container">
        <thead className="table-head">
          <tr>
            <td>No</td>
            <td>Cabang</td>
            <td>Posisi</td>
            <td>User ID</td>
            <td>Nama</td>
            <td>Email</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody className="table-body">
          {isLoading ? (
            <tr>
              <td colSpan="7">
                <LoadingSpinner />
              </td>
            </tr>
          ) : listUser.length > 0 ? (
            listUser.map((d, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{d.cabangDesc.toUpperCase()}</td>
                <td>{d.posisiDesc.toUpperCase()}</td>
                <td>{d.cabang.toUpperCase() + d.posisi.toUpperCase() + d.id}</td>
                <td>{d.nama}</td>
                <td>{d.email}</td>
                <td>
                  <Button
                    label="Edit"
                    color="orange"
                    width="full"
                    icon={<Refresh />}
                    clickHandler={() => editClickHandler(d)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Tidak ditemukan data user...</td>
            </tr>
          )}
        </tbody>
      </table>
      {showModalEditUser ? (
        <ModalEditUser user={userSelected} listCabang={listCabang} onClose={closeModalHandler} />
      ) : null}
    </div>
  );
};

export default ListUser;
