import React, { useCallback, useEffect, useRef, useState } from 'react'
import Footer from '../componets/layouts/footer'
import Header from '../componets/layouts/header'
import SideBar from '../componets/layouts/sidebar'
import CryptoJS from 'crypto-js'
import jwtDecode from 'jwt-decode'
import Link from 'next/link'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import FormatMoney from '../utils/FormatMoney'

export default function Faq({ user }) {
    const router = useRouter();
    const tableRef = useRef(null);
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            new simpleDatatables.DataTable(tableRef.current);
        }, 1000);
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const token = Cookies.get('token',)
            const decryptAES = CryptoJS.AES.decrypt(token, 'in_this_private_keys');
            const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);
            const headers = {
                Authorization: `Bearer ${oriToken}`
            }
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/product`, { headers });
            setFoods(res.data.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const token = Cookies.get('token',)
            const decryptAES = CryptoJS.AES.decrypt(token, 'in_this_private_keys');
            const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);
            const headers = {
                Authorization: `Bearer ${oriToken}`
            }
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/product/delete/${id}`, { headers });
            console.log(res.data);
            if (res.data.status === 200) {
                setTimeout(() => {
                    getProducts();
                }, 1000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <Header user={user} />
            <SideBar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Food</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item active">Food</li>
                        </ol>
                    </nav>
                </div>
                <section className="section dashboard">
                    <div className="row">

                        <button onClick={() => deleteProduct("63fc19c2fb906b7fad8f57dd")}>Testing</button>

                        {/* <!-- Left side columns --> */}
                        <div className="col-lg-12">
                            <div className="row">

                                {/* <!-- Food --> */}
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">

                                        <div className="card-body">
                                            <table ref={tableRef} className="table table-borderless">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Picture</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Category</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {foods.length > 0 ? foods.map((item, index) => {
                                                        console.log(item);
                                                        return (
                                                            <tr key={item._id}>
                                                                <th style={{
                                                                    "verticalAlign": "middle",
                                                                }} scope="row">{index + 1}</th>
                                                                <td style={{
                                                                    "verticalAlign": "middle",
                                                                }}><img src={`${process.env.NEXT_PUBLIC_IMG}/${item.picturePath}`} className="thumbnail" alt="Thumbnail" /></td>
                                                                <td style={{
                                                                    "verticalAlign": "middle",
                                                                }}>{item.name}</td>
                                                                <td style={{
                                                                    "verticalAlign": "middle",
                                                                }}>{FormatMoney.getFormattedMoney(item.price)}</td>
                                                                <td style={{
                                                                    "verticalAlign": "middle",
                                                                }}>{!item.category.length ? '-' : item.category.map(e => `${e.name} `)}</td>
                                                                <td style={{
                                                                    "verticalAlign": "middle",
                                                                }}>
                                                                    <button type="button" onClick={() => null} className="btn btn-sm rounded-pill btn-info">Edit</button>
                                                                    <button type="button" onClick={() => null} className="btn btn-sm rounded-pill btn-primary mx-2">Detail</button>
                                                                    <button type="button" onClick={() => deleteProduct(item._id)} className="btn btn-sm rounded-pill btn-danger">Delete</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }) : null}
                                                </tbody>
                                            </table>

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
    )
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

    const decryptAES = CryptoJS.AES.decrypt(token, 'in_this_private_keys');
    const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);

    const decode = jwtDecode(oriToken);

    if (decode.user.isAdmin === 'USER') {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {
            user: decode.user
        },
    }
}
