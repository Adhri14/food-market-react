import CryptoJS from "crypto-js";
import jwtDecode from "jwt-decode";
import React from "react";
import Footer from "../components/layouts/footer";
import Header from "../components/layouts/header";
import SideBar from "../components/layouts/sidebar";
import CardProfile from "../components/molecules/UserProfile/CardProfile";
import NavProfile from "../components/molecules/UserProfile/NavProfile";
import TabContentEditPassword from "../components/molecules/UserProfile/TabContentEditPassword";
import TabContentEditProfile from "../components/molecules/UserProfile/TabContentEditProfile";
import TabContentOverview from "../components/molecules/UserProfile/TabContentOverview";
import Link from "next/link";

export default function UserProfile() {
    return (
        <React.Fragment>
            <Header />
            <SideBar />
            <main id="main" className="main">

                <div className="pagetitle">
                    <h1>Profile</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item active">Profile</li>
                        </ol>
                    </nav>
                </div>
                {/* <!-- End Page Title --> */}

                <section className="section profile">
                    <div className="row">
                        <CardProfile />

                        <div className="col-xl-8">

                            <div className="card">
                                <div className="card-body pt-3">
                                    {/* <!-- Bordered Tabs --> */}
                                    <NavProfile />
                                    <div className="tab-content pt-2">

                                        <TabContentOverview />

                                        <TabContentEditProfile />

                                        <TabContentEditPassword />

                                    </div>
                                    {/* <!-- End Bordered Tabs --> */}

                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </main >
            <Footer />
        </React.Fragment >
    )
}

export async function getServerSideProps({ req }) {
    const { token } = req.cookies;
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

    if (!token) {
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
