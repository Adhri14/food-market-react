import Head from 'next/head';
import Script from 'next/script';

// Custom CSS
import '../public/assets/style.css';

// Vendor CSS Style
import '../public/assets/vendor/bootstrap/css/bootstrap.min.css';
import '../public/assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../public/assets/vendor/boxicons/css/boxicons.min.css';
import '../public/assets/vendor/quill/quill.snow.css';
import '../public/assets/vendor/quill/quill.bubble.css';
import '../public/assets/vendor/remixicon/remixicon.css';
import '../public/assets/vendor/simple-datatables/style.css';
import '../public/assets/vendor/remixicon/remixicon.css';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();

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

  return <>
    <Head>
      <meta charset="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />

      <title>{renderTitle()} - NiceAdmin</title>
      <meta content="" name="description" />
      <meta content="" name="keywords" />
      <link href="/assets/img/favicon.png" rel="icon" />
      <link href="/assets/img/apple-touch-icon.png" rel="apple-touch-icon" />

      {/* <!-- Google Fonts --> */}
      <link href="https://fonts.gstatic.com" rel="preconnect" />
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet" />

      <script src="/assets/js/main.js"></script>
      <script src="/assets/vendor/tinymce/tinymce.min.js"></script>
      <script src="/assets/vendor/simple-datatables/simple-datatables.js"></script>
    </Head>
    <Component {...pageProps} />
    {/* <!-- Vendor JS Files --> */}
    <Script src="/assets/vendor/apexcharts/apexcharts.min.js"></Script>
    {/* <Script src="https://cdn.jsdelivr.net/npm/apexcharts"></Script>
    <Script src="https://cdn.jsdelivr.net/npm/react-apexcharts"></Script> */}
    <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></Script>
    <Script src="/assets/vendor/chart.js/chart.min.js"></Script>
    <Script src="/assets/vendor/echarts/echarts.min.js"></Script>
    <Script src="/assets/vendor/quill/quill.min.js"></Script>
    <Script src="/assets/vendor/php-email-form/validate.js"></Script>
  </>
}

export default MyApp
