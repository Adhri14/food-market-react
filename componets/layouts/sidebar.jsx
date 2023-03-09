import { useRouter } from "next/router";
import NavLinkSidebar from '../atoms/NavLinkSidebar';

export default function SideBar() {
    const { pathname } = useRouter();

    return (
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

                <li className="nav-heading">Home</li>
                <NavLinkSidebar href="/" title="Dashboard" pathname={pathname} icon="bi-grid" />
                <li className="nav-heading">Pages</li>
                <NavLinkSidebar href="/user-profile" title="Profile" pathname={pathname} icon="bi-person" />
                <NavLinkSidebar href="/food" title="Food" pathname={pathname} icon="bi-currency-dollar" />
                <NavLinkSidebar href="/category" title="Category" pathname={pathname} icon="bi-bookmark-dash" />
                <NavLinkSidebar href="/transaction" title="Transaction" pathname={pathname} icon="bi-cart-check" />
            </ul>

        </aside>
    )
}