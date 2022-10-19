import React from 'react'
import Footer from '../componets/layouts/footer'
import Header from '../componets/layouts/header'
import SideBar from '../componets/layouts/sidebar'

export default function Faq() {
    return (
        <React.Fragment>
            <Header />
            <SideBar />
            <main id="main" class="main">
                <p class="text-center p-5">
                    This page is only available in the pro version! <a href="https://bootstrapmade.com/demo/templates/NiceAdmin/pages-faq.html" target="_blank">Preview the page online</a> | <a href="https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/#download" target="_blank">Buy the pro version</a>
                </p>
            </main>
            {/* <!-- End #main --> */}
            <Footer />
        </React.Fragment>
    )
}
