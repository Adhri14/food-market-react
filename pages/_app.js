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
  }, []);

  const renderTitle = () => {
    switch (pathname) {
      case '/':
        return 'Dashboard'
      case '/login':
        return 'Login'
      case '/transaction':
        return 'Transaction'
      case '/food':
        return 'Food'
      case '/food/create':
        return 'Food Create'
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
      </Head>
      <Component {...pageProps} />
      <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.js"></Script>
      {/* <script src="/assets/vendor/quill/quill.min.js"></script> */}
      <Script src="/assets/vendor/simple-datatables/simple-datatables.js"></Script>
      <Script src="/assets/js/main.js"></Script>
    </>
  )

}

export default MyApp
