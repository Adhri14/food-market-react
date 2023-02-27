import React, { useCallback, useEffect, useRef, useState } from 'react'
import Footer from '../componets/layouts/footer'
import Header from '../componets/layouts/header'
import SideBar from '../componets/layouts/sidebar'
import CryptoJS from 'crypto-js'
import jwtDecode from 'jwt-decode'
import Link from 'next/link'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function Faq({ user }) {
    const tableRef = useRef(null);
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            new simpleDatatables.DataTable(tableRef.current);
        }, 1000);
        getProducts();
    }, []);

    const getProducts = useCallback(async () => {
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
    }, [])

    return (
        <React.Fragment>
            <Header user={user} />
            <SideBar />
            <main id="main" class="main">
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
                                                    {foods.map((item, index) => (
                                                        <tr key={item._id}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td><img src={`${process.env.NEXT_PUBLIC_IMG}/${item.picturePath}`} className="thumbnail" alt="Thumbnail" /></td>
                                                            <td>{item.name}</td>
                                                            <td>{item.price}</td>
                                                            <td>{item.category.map(e => `${e.name} `)}</td>
                                                            <td>
                                                                <span className="badge bg-info">Edit</span>
                                                                <span className="badge bg-danger">Hapus</span>
                                                                <span className="badge bg-info">Detail</span>
                                                            </td>
                                                        </tr>
                                                    ))}
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
