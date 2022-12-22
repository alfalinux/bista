import React from "react";
import Layouts from "./_layouts";
import Swal from "sweetalert2";
import manifestPdf from "../../helpers/manifestPdf";
import Button from "../../components-app/ui/Button";

const index = () => {
  const submitHandler = () => {
    Swal.fire({
      title: "Gagal Create Manifest",
      text: "Periksa Kembali Inputan Anda",
      icon: "error",
      showCloseButton: true,
    });
  };
  return (
    <Layouts>
      <div>
        <button onClick={submitHandler}>Click Me</button>
      </div>
    </Layouts>
  );
};

export default index;
