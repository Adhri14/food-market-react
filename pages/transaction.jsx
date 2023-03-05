import { Fragment, useEffect, useState } from "react";
import Header from '../componets/layouts/header'
import SideBar from "../componets/layouts/sidebar";
import Footer from "../componets/layouts/footer";
import CryptoJS from "crypto-js";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import DataTable from "react-data-table-component";
import axios from "axios";
import Cookies from "js-cookie";
import FormatMoney from "../utils/FormatMoney";

export default function Transaction() {
    const user = useSelector(state => state.userProfile);
    const router = useRouter();
    const [transactions, setTransactions] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const timeout =
            filter !== ""
                ? setTimeout(() => {
                    // call function get filter
                    getTransaction(filter);
                }, 500)
                : getTransaction();

        return () => clearTimeout(timeout);
    }, [filter]);

    useEffect(() => {
        getTransaction();
    }, []);

    const getTransaction = async (filterTransaction = '') => {
        try {
            const token = Cookies.get("token");
            const decryptAES = CryptoJS.AES.decrypt(token, "in_this_private_keys");
            const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);
            const headers = {
                Authorization: `Bearer ${oriToken}`,
            };
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/transaction?status=${filterTransaction}`,
                { headers }
            );

            console.log('transaction : ', res.data);
            setTransactions(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    // const deleteProduct = async (id) => {
    //     try {
    //         const token = Cookies.get("token");
    //         const decryptAES = CryptoJS.AES.decrypt(token, "in_this_private_keys");
    //         const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);
    //         const headers = {
    //             Authorization: `Bearer ${oriToken}`,
    //         };
    //         const res = await axios.delete(
    //             `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/product/delete/${id}`,
    //             { headers }
    //         );
    //         if (res.data.status === 200) {
    //             getProducts();
    //             alert(res.data.message);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const columns = [
        {
            name: <b>Customer</b>,
            selector: (row) => <span>{row.user.name}</span>,
            sortable: true,
        },
        {
            name: <b>Food Name</b>,
            selector: (row) => <span>{row.itemOrder.name}</span>,
            sortable: true,
        },
        {
            name: <b>Food Thumbnail</b>,
            selector: (row) => (
                <img
                    src={`${process.env.NEXT_PUBLIC_IMG}/${row.itemOrder.picturePath}`}
                    alt="Thumbnail"
                    className="thumbnail"
                    width={100}
                    height={100}
                />
            ),
        },
        {
            name: <b>Food Price</b>,
            selector: (row) => <span>{FormatMoney.getFormattedMoney(row.itemOrder.price)}</span>,
        },
        {
            name: <b>Status</b>,
            selector: (row) => <span className={`badge bg-${row.status === 'pending' ? 'warning' : row.status === 'paid' ? 'success' : row.status === 'on_deliver' ? 'info' : 'danger'}`}>{row.status}</span>,
        },
        {
            name: <b>Number Order</b>,
            selector: (row) => <span>{row.numberOrder}</span>,
        },
        {
            name: <b>Total Order</b>,
            selector: (row) => <span>{row.qty} Item</span>,
        },
        {
            name: <b>Total Price</b>,
            selector: (row) => <span>{FormatMoney.getFormattedMoney(row.totalPrice)}</span>,
        },
    ];

    const renderStar = (point) => {
        let star = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= point) {
                star.push(
                    <i key={i} className="bi bi-star-fill text-warning me-2"></i>
                );
            } else {
                star.push(
                    <i key={i} className="bi bi-star-fill text-secondary me-2"></i>
                );
            }
        }
        return star;
    };

    const handleChangeStatus = async (status, id) => {
        try {
            const token = Cookies.get("token");
            const decryptAES = CryptoJS.AES.decrypt(token, "in_this_private_keys");
            const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);
            const headers = {
                Authorization: `Bearer ${oriToken}`,
            };
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/transaction/update-status/${id}`,
                { status },
                { headers }
            );
            console.log('cancel order : ', res.data);
            if (res.data.status === 200) {
                getTransaction();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancelOrder = async (id) => {
        try {
            const token = Cookies.get("token");
            const decryptAES = CryptoJS.AES.decrypt(token, "in_this_private_keys");
            const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);
            const headers = {
                Authorization: `Bearer ${oriToken}`,
            };
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/transaction/cancel-order/${id}`,
                {},
                { headers }
            );
            console.log('cancel order : ', res.data);
            if (res.data.status === 200) {
                getTransaction();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const ExpandedComponent = ({ data }) => {
        return (
            <div className="row justify-content-between p-5">
                <div className="col-lg-4">
                    <div className="card">
                        <img
                            src={`${process.env.NEXT_PUBLIC_IMG}/${data.itemOrder.picturePath}`}
                            className="card-img-top"
                            alt="Thumbnail"
                            width={512}
                            height={200}
                        />
                        <div className="card-body">
                            <h5 className="card-title">
                                {data.itemOrder.name}
                            </h5>
                            <p className="card-text">
                                {data.itemOrder.description}
                            </p>
                            <p className="card-text">
                                {FormatMoney.getFormattedMoney(data.itemOrder.price)}
                            </p>
                            <div className="d-flex mb-3">{renderStar(data.itemOrder.rating)}</div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <ul class="list-group">
                        <li class="list-group-item"><h5>Customer</h5></li>
                        <li class="list-group-item">Name : {data.user.name}</li>
                        <li class="list-group-item">Address : {data.user.address}</li>
                        <li class="list-group-item">House Number : {data.user.houseNumber}</li>
                        <li class="list-group-item">City : {data.user.city}</li>
                        <li class="list-group-item">Phone Number : {data.user.phoneNumber}</li>
                    </ul>
                </div>
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="row justify-content-between">
                                <div className="col-sm-6">
                                    <h5 className="mb-3">Transaction</h5>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex justify-content-end">
                                        <p className={`badge bg-${data.status === 'pending' ? 'warning' : data.status === 'paid' ? 'success' : data.status === 'on_deliver' ? 'info' : 'danger'}`}>{data.status}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-sm-6">
                                    <span className="text-center">Food Name</span>
                                </div>
                                <div className="col-sm-6">
                                    <p className="text-end">{data.itemOrder.name}</p>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-sm-6">
                                    <span className="text-center">Price Food</span>
                                </div>
                                <div className="col-sm-6">
                                    <p className="text-end">{FormatMoney.getFormattedMoney(data.itemOrder.price)}</p>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-sm-6">
                                    <span className="text-center">Total Items</span>
                                </div>
                                <div className="col-sm-6">
                                    <p className="text-end">x{data.qty} Items</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row justify-content-between">
                                <div className="col-sm-6">
                                    <b><span className="text-center">Total Price</span></b>
                                </div>
                                <div className="col-sm-6">
                                    <b><p className="text-end">{FormatMoney.getFormattedMoney(data.totalPrice)}</p></b>
                                </div>
                            </div>
                        </div>
                    </div>

                    {data.status === 'pending' && (
                        <button className="btn btn-danger w-100" type="button" onClick={() => handleCancelOrder(data._id)}>Cancel</button>
                    )}

                    {data.status === 'paid' && (
                        <>
                            <button className="btn btn-info w-100 mb-3" type="button" onClick={() => handleChangeStatus('on_deliver', data._id)}>On Deliver</button>
                            <button className="btn btn-danger w-100" type="button" onClick={() => handleCancelOrder(data._id)}>Cancel</button>
                        </>
                    )}

                    {data.status === 'on_deliver' && (
                        <button className="btn btn-success w-100" type="button" onClick={() => handleChangeStatus('success', data._id)}>Success</button>
                    )}

                </div>
            </div>
        )
    };

    return (
        <Fragment>
            <Header user={user} />
            <SideBar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Transaction</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link href="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">Transaction</li>
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
                                            <div className="row justify-content-between mb-2">
                                                <div className="col-lg-4">
                                                    <select className="form-select" value={filter} onChange={e => setFilter(e.target.value)} aria-label="Default select example">
                                                        <option value="">Filter by status transaction</option>
                                                        <option value="pending">Pending</option>
                                                        <option value="paid">Paid</option>
                                                        <option value="on_deliver">On Deliver</option>
                                                        <option value="cancel">Cancel</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <DataTable pagination data={transactions} expandableRowsComponent={ExpandedComponent} columns={columns} expandableRows />
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
        </Fragment>
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