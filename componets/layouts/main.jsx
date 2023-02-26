import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useEffect, useRef, useState } from "react";
import CardMain from "../molecules/CardMain";
import CryptoJS from "crypto-js";

export default function Main() {
    const [users, setUsers] = useState([]);
    const tableRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            new simpleDatatables.DataTable(tableRef.current);
        }, 1000)
        getAllUsers();
    }, [])

    const getAllUsers = useCallback(async () => {
        try {
            const token = Cookies.get('token');
            const decryptAES = CryptoJS.AES.decrypt(token, 'in_this_private_keys');
            const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/user/all`, { headers: { Authorization: `Bearer ${oriToken}` } });
            setUsers(res.data.data);
        } catch (error) {
            setUsers([]);
            // console.log(error);
        }
    }, []);

    return (
        <main id="main" className="main">

            <div className="pagetitle">
                <h1>Dashboard</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                </nav>
            </div>
            {/* <!-- End Page Title --> */}

            <section className="section dashboard">
                <div className="row">

                    {/* <!-- Left side columns --> */}
                    <div className="col-lg-12">
                        <div className="row">

                            <CardMain title="Sales" value="30">
                                <i className="bi bi-cart"></i>
                            </CardMain>
                            <CardMain title="Revenue" containerClassName="revenue-card" value={30000}>
                                <i className="bi bi-currency-dollar"></i>
                            </CardMain>
                            <CardMain title="Customers" containerClassName="customers-card" value={300}>
                                <i className="bi bi-people"></i>
                            </CardMain>


                            {/* <!-- Recent Sales --> */}
                            <div className="col-12">
                                <div className="card recent-sales overflow-auto">

                                    <div className="card-body">
                                        <h5 className="card-title">Customers</h5>

                                        <table ref={tableRef} className="table table-borderless">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Phone Number</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((item, index) => (
                                                    <tr key={item._id}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{item.name}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.phoneNumber}</td>
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
    )
}
