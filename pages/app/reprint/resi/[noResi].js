import React, { useEffect } from "react";
import PrintoutResi from "../../../../components-app/ui/PrintoutResi";

const ResiPrintoutPage = (props) => {
  useEffect(() => {
    window.addEventListener("afterprint", (e) => window.close());
  }, []);

  return (
    <div className="container-resi">
      <PrintoutResi data={props.data} />
      <PrintoutResi data={props.data} />
      <PrintoutResi data={props.data} />
    </div>
  );
};

export default ResiPrintoutPage;

export async function getServerSideProps(context) {
  return {
    props: { data: context.query },
  };
}
