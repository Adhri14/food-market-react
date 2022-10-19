import Link from 'next/link';
import PropTypes from 'prop-types';

export default function NavLinkSidebar(props) {
    const { href, icon, pathname, title, urlPath } = props;
    return (
        <li className="nav-item">
            <Link href={href}>
                <a className={`nav-link ${pathname !== href ? 'collapsed' : ''}`}>
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