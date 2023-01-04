import Head from "next/head";
import MainNav from "../components-user/MainNav";
import LoginPage from "../components-user/LoginPage";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingPage from "../components-app/ui/LoadingPage";
import Info from "../components-user/Info";
import Footer from "../components-user/Footer";

const UserLoginPage = () => {
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    if (status === "authenticated") {
      router.push("/app");
    }
    setIsLoading(false);
  }, [router, status]);

  return (
    <>
      {status === "authenticated" ? null : (
        <>
          <Head>
            <title>Halaman Login</title>
          </Head>
          {isLoading ? <LoadingPage /> : null}
          <MainNav />
          <LoginPage />
          <Info color="#fff" />
          <Footer />
        </>
      )}
    </>
  );
};

export default UserLoginPage;
