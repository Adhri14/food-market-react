import Link from "next/link";
import Cookies from "js-cookie";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import CryptoJS from "crypto-js";

export default function Header() {
  const user = useSelector(state => state.userProfile);
  // const getUser = Cookies.get('auth');
  // console.log('cek cookies : ', getUser);
  // const user = CryptoJS.AES.decrypt(getUser, "$3cR3t_Pr0f!l");
  const router = useRouter();
  const onLogout = useCallback(() => {
    Cookies.remove("token");
    router.push("/login");
  }, []);

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link href="/" className="cursor-pointer">
          <div className="logo d-flex align-items-center text-decoration-none">
            <img src="/assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">FoodMarket</span>
          </div>
        </Link>
        <i className="bi bi-list toggle-sidebar-btn"></i>
      </div>
      {/* <!-- End Logo --> */}

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_IMG}/${user.picturePath}`}
                alt="Profile"
                className="rounded-circle"
                width={120}
                height={120}
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                {user.name}
              </span>
            </a>
            {/* <!-- End Profile Iamge Icon --> */}

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{user.name}</h6>
                <span>{user.isAdmin}</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="/user-profile"
                >
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <button
                  type="button"
                  onClick={onLogout}
                  className="dropdown-item d-flex align-items-center"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </button>
              </li>
            </ul>
            {/* <!-- End Profile Dropdown Items --> */}
          </li>
          {/* <!-- End Profile Nav --> */}
        </ul>
      </nav>
      {/* <!-- End Icons Navigation --> */}
    </header>
  );
}
