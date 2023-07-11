import React, { useEffect, useState } from "react";
import Footer from "../components/layouts/footer";
import Header from "../components/layouts/header";
import SideBar from "../components/layouts/sidebar";
import CryptoJS from "crypto-js";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import FormatMoney from "../utils/FormatMoney";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";

export default function Category() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategory();
    }, []);

    const getCategory = async () => {
        try {
            const token = Cookies.get("token");
            const decryptAES = CryptoJS.AES.decrypt(token, "in_this_private_keys");
            const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);
            const headers = {
                Authorization: `Bearer ${oriToken}`,
            };
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/category`,
                { headers }
            );
            setCategories(res.data.data);
        } catch (error) {
            // console.log(error.response);
        }
    };

    const deleteCategory = async (id) => {
        try {
            const token = Cookies.get("token");
            const decryptAES = CryptoJS.AES.decrypt(token, "in_this_private_keys");
            const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);
            const headers = {
                Authorization: `Bearer ${oriToken}`,
            };
            const res = await axios.delete(
                `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/category/delete/${id}`,
                { headers }
            );
            if (res.data.status === 200) {
                getCategory();
                alert(res.data.message);
            }
        } catch (error) {
            // console.log(error);
        }
    };

    const columns = [
        {
            name: "Name",
            selector: (row) => <span>{row.name}</span>,
            sortable: true,
        },
        {
            name: "Action",
            selector: (row) => (
                <div className="d-flex">
                    <Link href={`/category/update/${row._id}`}>
                        <span className="btn btn-sm btn-info text-white">Edit</span>
                    </Link>
                    <span
                        onClick={() => deleteCategory(row._id)}
                        type="button"
                        className="btn btn-sm btn-danger ms-2"
                    >
                        Delete
                    </span>
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
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
                            <li className="breadcrumb-item active">Category</li>
                        </ol>
                    </nav>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        {/* <!-- Left side columns --> */}
                        <div className="col-lg-12">
                            <div className="row">
                                {/* <!-- Food --> */}
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">
                                        <div className="card-body">
                                            <div className="row justify-content-start mb-2">
                                                <div className="col-lg-4 d-flex justify-content-start">
                                                    <button
                                                        type="button"
                                                        onClick={() => router.push("/category/create")}
                                                        className="btn btn-primary"
                                                    >
                                                        <i className="bi bi-plus-circle me-2"></i>
                                                        Add Category
                                                    </button>
                                                </div>
                                            </div>
                                            {/* <DataTable pagination data={categories} columns={columns} /> */}
                                            <DataTable data={categories} columns={columns} pagination />
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- End Recent Sales --> */}
                            </div>
                        </div>
                        {/* <!-- End Left side columns --> */}
                    </div>
                </section>
            </main>
            {/* <!-- End #main --> */}
            <Footer />
        </React.Fragment>
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
