import axios from "axios";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Alert from "../../componets/atoms/Alert";
import Footer from "../../componets/layouts/footer";
import Header from "../../componets/layouts/header";
import SideBar from "../../componets/layouts/sidebar";
import FormatMoney from "../../utils/FormatMoney";

export default function CreateCategory() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: null,
    });
    const [messageError, setMessageError] = useState({
        text: "",
        code: 0,
    });

    const onValueChange = (key, value) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get("token");
        const decryptAES = CryptoJS.AES.decrypt(token, "in_this_private_keys");
        const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);
        const headers = {
            Authorization: `Bearer ${oriToken}`,
        };
        setMessageError({
            ...messageError,
            text: "",
            code: 0,
        });
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/category/create`,
                form,
                { headers }
            );
            if (res.data.status === 201) {
                router.push("/category");
            }
        } catch (error) {
            // console.log(error);
            const statusCode =
                error?.response?.status === undefined ? 0 : error?.response?.status;
            const message = error.response?.data;
            setMessageError({
                ...messageError,
                text: message.message,
                code: statusCode,
            });
        }
    };

    return (
        <Fragment>
            <Header />
            <SideBar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Category</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link href="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link href="/category">Category</Link>
                            </li>
                            <li className="breadcrumb-item active">Create</li>
                        </ol>
                    </nav>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        {/* Right side columns */}
                        <div className="col-lg-6">
                            {/* <!-- Food --> */}
                            <div className="col-12">
                                <div className="card recent-sales overflow-auto">
                                    <div className="card-body">
                                        <h5 className="card-title">Create Category</h5>
                                        {messageError.code !== 0 && (
                                            <Alert
                                                className="alert-danger"
                                                title={messageError.text}
                                            />
                                        )}
                                        <form onSubmit={onSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="name" className="form-label">
                                                    Name Category
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="Type your name category"
                                                    value={form.name}
                                                    onChange={(val) =>
                                                        onValueChange("name", val.target.value)
                                                    }
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary">
                                                Save Category
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- End Recent Sales --> */}
                        </div>
                        {/* <!-- End Left side columns --> */}
                    </div>
                </section>
            </main>
            {/* <!-- End #main --> */}
            <Footer />
        </Fragment>
    );
}

export async function getServerSideProps({ req }) {
    const { token } = req.cookies;

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    const decryptAES = CryptoJS.AES.decrypt(token, "in_this_private_keys");
    const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);

    const decode = jwtDecode(oriToken);

    if (decode.user.isAdmin === "USER") {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {
            user: decode.user,
        },
    };
}
