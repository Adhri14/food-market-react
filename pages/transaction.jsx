import { Fragment } from "react";
import Header from '../componets/layouts/header'
import SideBar from "../componets/layouts/sidebar";
import Footer from "../componets/layouts/footer";
import CryptoJS from "crypto-js";
import jwtDecode from "jwt-decode";
import Link from "next/link";

export default function Contact({ user }) {
    return (
        <Fragment>
            <Header user={user} />
            <SideBar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Transaction</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item active">Transaction</li>
                        </ol>
                    </nav>
                </div>
                <p className="text-center p-5">
                    This page is only available in the pro version! <a href="https://bootstrapmade.com/demo/templates/NiceAdmin/pages-contact.html" target="_blank">Preview the page online</a> | <a href="https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/#download" target="_blank">Buy the pro version</a>
                </p>
            </main>
        </Fragment>
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