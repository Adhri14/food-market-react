import Footer from "../componets/layouts/footer";
import Header from "../componets/layouts/header";
import Main from "../componets/layouts/main";
import SideBar from "../componets/layouts/sidebar";

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
