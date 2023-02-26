import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import Alert from "../componets/atoms/alert";
import CryptoJS from "crypto-js";

export default function Login() {
    const router = useRouter();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const [messageError, setMessageError] = useState({
        code: 0,
        text: '',
    });

    const onChangeText = (key, value) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    const onSubmit = async () => {
        setIsLoading(true);
        setMessageError({
            ...messageError,
            code: 0,
            text: ''
        });
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/auth/sign-in`, form);
            // localStorage.setItem('token', encrypt(res.data.data));
            Cookies.set('token', CryptoJS.AES.encrypt(res.data.data, 'in_this_private_keys')).toString();
            router.push('/', undefined, { shallow: true });
        } catch (error) {
            console.log(error);
            setMessageError({
                ...messageError,
                code: error.response?.status,
                text: error.response?.data?.message || error.response?.data?.statusText
            });
        }
        setIsLoading(false);
    }

    return (
        <main>
            <div className="container">

                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                <div className="d-flex justify-content-center py-4">
                                    <div className="logo d-flex align-items-center w-auto">
                                        <img src="/assets/img/logo.png" alt="Logo" />
                                        <span className="d-none d-lg-block">FoodMarket</span>
                                    </div>
                                </div>
                                {/* <!-- End Logo --> */}

                                <div className="card mb-3">

                                    <div className="card-body">

                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                            <p className="text-center small">Enter your email & password to login</p>
                                        </div>

                                        <div className="row g-3">

                                            {messageError.code !== 0 ? <Alert className="alert-danger" title={messageError.text} /> : null}

                                            <div className="col-12">
                                                <label for="yourUsername" className="form-label">Email</label>
                                                <div className="input-group has-validation">
                                                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                    <input value={form.email} onChange={e => onChangeText('email', e.target.value)} type="email" className="form-control" id="yourUsername" required />
                                                    <div className="invalid-feedback">Please enter your username.</div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <label for="yourPassword" className="form-label">Password</label>
                                                <input value={form.password} onChange={e => onChangeText('password', e.target.value)} type="password" name="password" className="form-control" id="yourPassword" required />
                                                <div className="invalid-feedback">Please enter your password!</div>
                                            </div>

                                            {/* <div className="col-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                                                    <label className="form-check-label" for="rememberMe">Remember me</label>
                                                </div>
                                            </div> */}
                                            <div className="col-12">
                                                <button disabled={isLoading} onClick={onSubmit} className="btn btn-primary w-100" type="button">{isLoading ? "Loading..." : "Login"}</button>
                                                {/* <a href="/" className="btn btn-primary w-100">Login</a> */}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

            </div>
        </main>
    )
}
