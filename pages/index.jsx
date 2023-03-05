import CryptoJS from "crypto-js";
import jwtDecode from 'jwt-decode';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../componets/layouts/footer";
import Header from "../componets/layouts/header";
import Main from "../componets/layouts/main";
import SideBar from "../componets/layouts/sidebar";

export default function index() {
  const user = useSelector(state => state.userProfile);

  return (
    <>
      <Header user={user} />
      {/* < !-- ======= Sidebar ======= --> */}
      <SideBar />
      {/* <!--End Sidebar-- > */}

      <Main />
      {/* <!--End #main -- > */}

      {/* < !-- ======= Footer ======= --> */}
      <Footer />
      {/* <!--End Footer-- > */}

      <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const decryptAES = CryptoJS.AES.decrypt(token, 'in_this_private_keys');
  const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);

  const decode = jwtDecode(oriToken);

  if (decode.user.isAdmin === 'USER') {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: decode.user
    },
  }
}
