import axios from "axios";
import { memo, useCallback, useState } from "react";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const SweetAlert = withReactContent(Swal);
const TabContentEditPassword = memo(() => {
    const router = useRouter();
    const [form, setForm] = useState({
        currPassword: '',
        newPassword: '',
        rePassword: '',
    });

    const [errors, setErrors] = useState({
        currPassword: false,
        messagePassword: '',
        newPassword: false,
        messageNewPassword: '',
        rePassword: false,
        messageRePassword: ''
    });

    const onChangeText = useCallback((key, value) => {
        setForm({
            ...form,
            [key]: value,
        });
    }, [form]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get('token');
        const decryptAES = CryptoJS.AES.decrypt(token, 'in_this_private_keys');
        const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);
        const headers = {
            Authorization: `Bearer ${oriToken}`,
        }

        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/user/update-password`, form, { headers });
            if (res.data.status === 200) {
                SweetAlert.fire({
                    icon: 'success',
                    text: "Anda berhasil mengubah password. Sesi anda akan kami hapus dan anda akan di arahkan ke halaman login kembali!",
                }).then(() => {
                    Cookies.remove('token');
                    router.push('/login');
                });
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 422) {
                const messageError = error.response.data.data;
                setErrors({
                    ...form,
                    currPassword: !messageError?.currPassword ? false : true,
                    messagePassword: messageError?.currPassword || '',
                    newPassword: !messageError?.newPassword ? false : true,
                    messageNewPassword: messageError?.newPassword || '',
                    rePassword: !messageError?.rePassword ? false : true,
                    messageRePassword: messageError?.rePassword || ''
                })
            }
        }
    }

    return (
        <div className="tab-pane fade pt-3" id="profile-change-password">
            {/* <!-- Change Password Form --> */}
            <form onSubmit={onSubmit}>

                <div className="row mb-3">
                    <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                    <div className="col-md-8 col-lg-9">
                        <input name="password" type="password" className="form-control" id="currentPassword" value={form.currPassword} onChange={e => {
                            onChangeText('currPassword', e.target.value);
                            setErrors({ ...errors, currPassword: false, messagePassword: '' });
                        }} />
                        {errors.currPassword && <span className="text-danger"><small>{errors.messagePassword}</small></span>}
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
                    <div className="col-md-8 col-lg-9">
                        <input name="newpassword" type="password" className="form-control" id="newPassword" value={form.newPassword} onChange={e => {
                            onChangeText('newPassword', e.target.value);
                            setErrors({ ...errors, newPassword: false, messageNewPassword: '' });
                        }} />
                        {errors.newPassword && <span className="text-danger"><small>{errors.messageNewPassword}</small></span>}
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                    <div className="col-md-8 col-lg-9">
                        <input name="renewpassword" type="password" className="form-control" id="renewPassword" value={form.rePassword} onChange={e => {
                            onChangeText('rePassword', e.target.value);
                            setErrors({ ...errors, rePassword: false, messageRePassword: '' });
                        }} />
                        {errors.rePassword && <span className="text-danger"><small>{errors.messageRePassword}</small></span>}
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Change Password</button>
                </div>
            </form>
            {/* <!-- End Change Password Form --> */}

        </div>
    );
});

export default TabContentEditPassword;