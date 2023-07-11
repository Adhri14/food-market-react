import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function NavLinkSidebar(props) {
    const { href, icon, pathname, title, urlPath } = props;

    useEffect(() => {
        const body = document.querySelector('body');
        const liSidebar = document.querySelector('.nav-sidebar');

        function handleClick() {
            body.classList.remove('toggle-sidebar');
        }

        liSidebar.addEventListener('click', handleClick);

        return () => {
            liSidebar.removeEventListener('click', handleClick);
        }
    }, [])

    return (
        <li className="nav-item nav-sidebar">
            <Link href={href}>
                <a className={`nav-link ${pathname !== href ? "collapsed" : ""}`}>
                    <i className={`bi ${icon}`}></i>
                    <span>{title}</span>
                </a>
            </Link>
        </li>
    )
}

NavLinkSidebar.propTypes = {
    href: PropTypes.string,
    icon: PropTypes.string,
    pathname: PropTypes.string,
    title: PropTypes.string,
    urlPath: PropTypes.string,
}