import { Fragment } from "react";
import Header from '../componets/layouts/header'
import SideBar from "../componets/layouts/sidebar";
import Footer from "../componets/layouts/footer";

export default function Contact() {
    return (
        <Fragment>
            <Header />
            <SideBar />
            <main id="main" className="main">
                <p className="text-center p-5">
                    This page is only available in the pro version! <a href="https://bootstrapmade.com/demo/templates/NiceAdmin/pages-contact.html" target="_blank">Preview the page online</a> | <a href="https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/#download" target="_blank">Buy the pro version</a>
                </p>
            </main>
        </Fragment>
    )
}