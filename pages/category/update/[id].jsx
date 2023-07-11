import axios from "axios";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Alert from "../../../components/atoms/Alert";
import Footer from "../../../components/layouts/footer";
import Header from "../../../components/layouts/header";
import SideBar from "../../../components/layouts/sidebar";

export default function UpdateCategory() {
    const router = useRouter();
    const { id } = router.query;
    const [form, setForm] = useState({
        name: null,
    });
    const [messageError, setMessageError] = useState({
        text: "",
        code: 0,
    });

    useEffect(() => {
        getDetailCategory();
    }, [])

    const onValueChange = (key, value) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    const getDetailCategory = async () => {
        const token = Cookies.get("token");
        const decryptAES = CryptoJS.AES.decrypt(token, "in_this_private_keys");
        const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);
        const headers = {
            Authorization: `Bearer ${oriToken}`,
        };
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/category/${id}`,
                { headers }
            );
            setForm({
                ...form,
                name: res.data.data.name,
            });
        } catch (error) {
            // console.log(error);
        }
    }

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
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/category/update/${id}`,
                form,
                { headers }
            );
            if (res.data.status === 200) {
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
                            <li className="breadcrumb-item active">Update</li>
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
                                        <h5 className="card-title">Update Category</h5>
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
                                                Update Category
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
