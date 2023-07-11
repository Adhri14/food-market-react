import Head from "next/head";
import Script from "next/script";
// Custom CSS
import "../styles/globals.css";

// Vendor CSS Style
import "../public/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../public/assets/vendor/bootstrap/css/bootstrap.css";
import "../public/assets/vendor/boxicons/css/boxicons.min.css";
import "../public/assets/vendor/quill/quill.bubble.css";
import "../public/assets/vendor/quill/quill.snow.css";
import "../public/assets/vendor/remixicon/remixicon.css";
import "../public/assets/vendor/simple-datatables/style.css";
// import '../public/assets/vendor/remixicon/remixicon.css';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { renderTitle } from "../utils/renderTitle";
import SidebarProvider from "../context/SidebarReducer";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  useEffect(() => {
    import('../public/assets/vendor/bootstrap/js/bootstrap.bundle.js');
  }, [])

  if (!showChild) return null;

  if (typeof window === undefined) return <div></div>;

  return (
    <Provider store={store}>
      <SidebarProvider>
        <Head>
          <title>{renderTitle(pathname)} - FoodMarket</title>
          {/* <!-- Vendor JS Files --> */}
        </Head>
        <Component {...pageProps} />
      </SidebarProvider>
    </Provider>
  );
}

export default MyApp;
