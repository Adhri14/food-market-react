import { Fragment, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import CryptoJS from "crypto-js";
import Header from "../../componets/layouts/header";
import SideBar from "../../componets/layouts/sidebar";
import Footer from "../../componets/layouts/footer";
import Link from "next/link";
import FormatMoney from "../../utils/FormatMoney";
import axios from "axios";
import Cookies from "js-cookie";
import Select from 'react-select';
import { useRouter } from "next/router";

export default function CreateFood({ user }) {
    const router = useRouter();
    const [image, setImage] = useState();
    const [previewImg, setPreviewImg] = useState();
    const [isUploadImage, setIsUploadImage] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectCategories, setSelectCategories] = useState([]);
    const [form, setForm] = useState({
        name: '',
        description: '',
        ingredients: '',
        price: 0,
        rating: 0,
    });

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        const token = Cookies.get('token',)
        const decryptAES = CryptoJS.AES.decrypt(token, 'in_this_private_keys');
        const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);
        const headers = {
            Authorization: `Bearer ${oriToken}`,
        }
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/category`, { headers });
            console.log(res.data);
            let newData = [];
            res.data.data.map(item => {
                newData.push({ value: item._id, label: item.name });
            });

            setCategories(newData);
        } catch (error) {
            console.log(error);
        }
    }

    const renderStar = (point) => {
        let star = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= point) {
                star.push(<i key={i} className="bi bi-star-fill text-warning me-2"></i>);
            } else {
                star.push(<i key={i} className="bi bi-star-fill text-secondary me-2"></i>);
            }
        }
        return star;
    };

    const onValueChange = (key, value) => {
        setForm({
            ...form,
            [key]: value,
        });
    }

    const chooseImage = (value) => {
        const urlImage = URL.createObjectURL(value);
        setIsUploadImage(true);
        setPreviewImg(urlImage);
        return setImage(value);
    }

    const onSubmit = async () => {
        const token = Cookies.get('token',)
        const decryptAES = CryptoJS.AES.decrypt(token, 'in_this_private_keys');
        const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);
        const headers = {
            Authorization: `Bearer ${oriToken}`,
        }
        try {
            if (isUploadImage) {
                const resUploadImage = await axios.post(`${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/user/io-file`, { file: image }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                if (resUploadImage.data.status === 200) {
                    let newData = [];
                    selectCategories.map(item => {
                        newData.push(item.value);
                    })
                    const body = {
                        ...form,
                        category: newData,
                        picturePath: resUploadImage.data.data.file,
                    };
                    console.log(body);
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/product/create`, body, { headers });
                    console.log(res.data);
                    router.push('/food');
                }
            } else {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/product/create`, form, { headers });
                if (res.data.status === 200) {
                    console.log(res.data);
                    router.push('/food');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
            <Header user={user} />
            <SideBar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Food</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link href="/food">Food</Link></li>
                            <li className="breadcrumb-item active">Create</li>
                        </ol>
                    </nav>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        {/* <!-- Left side columns --> */}
                        <div className="col-lg-4">
                            <div className="card">
                                {!previewImg && !isUploadImage ? <div style={{
                                    backgroundColor: 'GrayText',
                                    height: 200,
                                    borderTopLeftRadius: 5,
                                    borderTopRightRadius: 5,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'white',
                                    fontSize: '2rem'
                                }}>
                                    512 X 512
                                </div> : <img src={previewImg} className="card-img-top" alt="Thumbnail" width={512} height={200} />}
                                <div className="card-body">
                                    <h5 className="card-title">{form.name ? form.name : 'Belum di isi'}</h5>
                                    <p className="card-text">{form.description ? form.description : 'Belum diisi'}</p>
                                    <p className="card-text">{FormatMoney.getFormattedMoney(form.price)}</p>
                                    <div className="d-flex mb-3">
                                        {renderStar(form.rating)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Right side columns */}
                        <div className="col-lg-8">

                            {/* <!-- Food --> */}
                            <div className="col-12">
                                <div className="card recent-sales overflow-auto">
                                    <div className="card-body">
                                        <h5 className="card-title">Create Food</h5>

                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name Food</label>
                                            <input type="text" className="form-control" id="name" placeholder="Type your name food" value={form.name} onChange={val => onValueChange('name', val.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">Description Food</label>
                                            <input type="text" className="form-control" id="description" placeholder="Type your description food" value={form.description} onChange={val => onValueChange('description', val.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="category" className="form-label">Category Food</label>
                                            <Select
                                                id="category"
                                                isMulti
                                                placeholder="Choose your category"
                                                options={categories}
                                                value={[...selectCategories]}
                                                onChange={val => setSelectCategories([...val])}
                                                formatGroupLabel={e => <span>{e.label}</span>}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="ingredients" className="form-label">Ingredients Food</label>
                                            <input type="text" className="form-control" id="ingredients" placeholder="Type your ingredients food" value={form.ingredients} onChange={val => onValueChange('ingredients', val.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="price" className="form-label">Price Food</label>
                                            <input type="number" className="form-control" id="price" placeholder="Type your price food" value={form.price} onChange={val => onValueChange('price', val.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="rating" className="form-label">Rating Food</label>
                                            <input type="number" className="form-control" id="rating" placeholder="Type your rating food" value={form.rating} onChange={val => onValueChange('rating', val.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="image" className="form-label">Image</label>
                                            <input className="form-control" id="image" type="file" accept="image/png, image/jpeg, image/jpg" onChange={val => chooseImage(val.target.files[0])} />
                                        </div>

                                        <button type="button" className="btn btn-primary" onClick={onSubmit}>Save Food</button>
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