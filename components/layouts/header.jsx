import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

export default function Header() {
  const getUser = Cookies.get('token.local');
  const decrypt = CryptoJS.AES.decrypt(getUser, "user_profile");
  const user = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));

  const router = useRouter();
  const onLogout = useCallback(() => {
    Cookies.remove("token");
    Cookies.remove("token.local");
    router.push("/login");
  }, []);

  useEffect(() => {
    const body = document.querySelector('body');
    const toggleBtn = document.querySelector('.toggle-sidebar-btn');
    const clickMenu = () => {
      body.classList.toggle('toggle-sidebar');
    }

    toggleBtn.addEventListener('click', clickMenu);
    return () => {
      toggleBtn.removeEventListener('click', clickMenu);
    }
  }, [])


  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link href="/" className="cursor-pointer">
          <div className="logo d-flex align-items-center text-decoration-none">
            <img src="/assets/img/LogoFoodMarket.png" alt="Logo Food Market" />
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
                className="profile-picture rounded-circle"
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
