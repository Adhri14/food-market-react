import Head from 'next/head';
import Script from 'next/script';
// Custom CSS
import '../styles/globals.css';

// Vendor CSS Style
import '../public/assets/vendor/bootstrap/css/bootstrap.css';
import '../public/assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../public/assets/vendor/boxicons/css/boxicons.min.css';
import '../public/assets/vendor/quill/quill.snow.css';
import '../public/assets/vendor/quill/quill.bubble.css';
import '../public/assets/vendor/remixicon/remixicon.css';
import '../public/assets/vendor/simple-datatables/style.css';
// import '../public/assets/vendor/remixicon/remixicon.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, [])

  const renderTitle = () => {
    switch (pathname) {
      case '/':
        return 'Dashboard'
      case '/blank':
        return 'Blank'
      case '/register':
        return 'Registrasi'
      case '/login':
        return 'Login'
      case '/contact':
        return 'Contact'
      case '/contact':
        return 'Contact'
      case '/faq':
        return 'F.A.Q'
      case '/user-profile':
        return 'Profile'

      default:
        return 'Not found'
    }
  }

  if (!showChild) return null;

  if (typeof window === undefined) return <div></div>;

  return (
    <>
      <Head>
        <title>{renderTitle()} - FoodMarket</title>
        {/* <!-- Vendor JS Files --> */}
        <script src="/assets/vendor/quill/quill.min.js"></script>
        <script src="/assets/vendor/simple-datatables/simple-datatables.js"></script>
        <script src="/assets/js/main.js"></script>
      </Head>
      <Component {...pageProps} />
      <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.js"></script>
    </>
  )

}

export default MyApp
