import jwtDecode from "jwt-decode";
import React from "react";
import Footer from "../componets/layouts/footer";
import Header from "../componets/layouts/header";
import SideBar from "../componets/layouts/sidebar";
import CryptoJS from "crypto-js";
import CardProfile from "../componets/molecules/UserProfile/CardProfile";
import NavProfile from "../componets/molecules/UserProfile/NavProfile";
import TabContentOverview from "../componets/molecules/UserProfile/TabContentOverview";
import TabContentEditProfile from "../componets/molecules/UserProfile/TabContentEditProfile";
import TabContentEditPassword from "../componets/molecules/UserProfile/TabContentEditPassword";
import { useSelector } from "react-redux";

export default function UserProfile() {
    const user = useSelector(state => state.userProfile);
    return (
        <React.Fragment>
            <Header user={user} />
            <SideBar />
            <main id="main" className="main">

                <div className="pagetitle">
                    <h1>Profile</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">Profile</li>
                        </ol>
                    </nav>
                </div>
                {/* <!-- End Page Title --> */}

                <section className="section profile">
                    <div className="row">
                        <CardProfile user={user} />

                        <div className="col-xl-8">

                            <div className="card">
                                <div className="card-body pt-3">
                                    {/* <!-- Bordered Tabs --> */}
                                    <NavProfile />
                                    <div className="tab-content pt-2">

                                        <TabContentOverview user={user} />

                                        <TabContentEditProfile user={user} />

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
