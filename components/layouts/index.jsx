import Footer from "./footer";
import Header from "./header";
import SideBar from "./sidebar";

export default function Layouts({ children }) {
    return (
        <>
            <Header />
            <SideBar />
            <main id="main" className="main">
                {children}
            </main>
            <Footer />
        </>
    )
}