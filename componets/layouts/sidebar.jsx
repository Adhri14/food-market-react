import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react"
import Link from 'next/link';
import NavLinkSidebar from '../atoms/NavLinkSidebar'

export default function SideBar() {
    const { pathname } = useRouter();

    return (
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

                <li className="nav-heading">Home</li>
                <NavLinkSidebar href="/" title="Dashboard" pathname={pathname} icon="bi-grid" />
                {/* <!-- End Dashboard Nav --> */}

                <li className="nav-heading">Pages</li>

                <NavLinkSidebar href="/user-profile" title="Profile" pathname={pathname} icon="bi-person" />
                {/* <!-- End Profile Page Nav --> */}

                <NavLinkSidebar href="/food" title="Food" pathname={pathname} icon="bi-currency-dollar" />
                {/* <!-- End F.A.Q Page Nav --> */}

                <NavLinkSidebar href="/transaction" title="Transaction" pathname={pathname} icon="bi-cart-check" />
                {/* <!-- End Contact Page Nav --> */}

            </ul>

        </aside>
    )
}