import CryptoJS from "crypto-js";
import jwtDecode from 'jwt-decode';
import Footer from "../components/layouts/footer";
import Header from "../components/layouts/header";
import Main from "../components/layouts/main";
import SideBar from "../components/layouts/sidebar";

export default function index() {

  return (
    <>
      <Header />
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
