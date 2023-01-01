import React from "react";
import Head from "next/head";
import Dashboard from "../../components-app/Dashboard";
import Layouts from "./_layouts";

const index = () => {
  return (
    <>
      <Head>
        <title>Bista Management System</title>
      </Head>
      <Layouts>
        <Dashboard />
      </Layouts>
    </>
  );
};

export default index;
