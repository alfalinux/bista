import React, { useEffect } from "react";
import PrintoutLabel from "../../../../components-app/ui/PrintoutLabel";

const LabelPrintoutPage = (props) => {
  useEffect(() => {
    window.addEventListener("afterprint", (e) => window.close());
  }, []);

  return (
    <div className="container-label">
      <PrintoutLabel data={props.data} />
    </div>
  );
};

export default LabelPrintoutPage;

export async function getServerSideProps(context) {
  return {
    props: { data: context.query },
  };
}
