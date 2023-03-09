import axios from "axios";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../../action/userProfile";
import Alert from "../../atoms/Alert";


export default function TabContentEditProfile() {
    // const user = useSelector(state => state.userProfile);
    const getUser = Cookies.get('token.local');
    const decrypt = CryptoJS.AES.decrypt(getUser, "user_profile");
    const user = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));

    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        houseNumber: '',
        city: '',
    });
    const [previewImage, setPreviewImage] = useState('');
    const [currentImage, setCurrentImage] = useState(user.picturePath);
    const [isUploadPicture, setIsUploadPicture] = useState(false);
    const [message, setMessage] = useState('');
    const [isShowAlert, setIsShowAlert] = useState(false);

    useEffect(() => {
        setForm({
            ...form,
            name: user.name,
            phoneNumber: user.phoneNumber,
            address: user.address,
            houseNumber: user.houseNumber,
            city: user.city
        });
        setPreviewImage(`${process.env.NEXT_PUBLIC_IMG}/${user.picturePath}`);
        setIsShowAlert(false);
        setMessage('');
    }, [])

    const onChangeText = (key, value) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    const chooseImage = (value) => {
        const files = value.target.files;
        if (!files.length || files.length < 0) {
            setPreviewImage(`${process.env.NEXT_PUBLIC_IMG}/${user.picturePath}`);
            setCurrentImage(user.picturePath);
            setIsUploadPicture(false);
            return
        }
        const createURL = URL.createObjectURL(files[0]);
        setPreviewImage(createURL);
        setIsUploadPicture(true);
        setCurrentImage(files[0]);
        return
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get("token");
        const decryptAES = CryptoJS.AES.decrypt(token, "in_this_private_keys");
        const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);
        const headers = {
            Authorization: `Bearer ${oriToken}`,
        };
        try {
            if (isUploadPicture) {
                const uploadFile = await axios.post(`${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/user/io-file`, { file: currentImage }, { headers: { 'Content-Type': 'multipart/form-data' } });

                if (uploadFile.data.status === 200) {
                    const body = {
                        ...form,
                        picturePath: uploadFile.data.data.file
                    }
                    const res = await axios.put(
                        `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/user/update-profile`,
                        body,
                        { headers }
                    );
                    if (res.data.status === 200) {
                        dispatch(getUserProfile(oriToken));
                        setMessage(res.data.message);
                        setIsShowAlert(true);
                        setTimeout(() => {
                            setIsShowAlert(false);
                        }, 3000);
                    }
                }
            } else {
                const body = {
                    ...form,
                    picturePath: currentImage
                }
                const res = await axios.put(
                    `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/user/update-profile`,
                    body,
                    { headers }
                );
                if (res.data.status === 200) {
                    dispatch(getUserProfile(oriToken));
                    setMessage(res.data.message);
                    setIsShowAlert(true);
                    setTimeout(() => {
                        setIsShowAlert(false);
                    }, 3000);
                }
            }
        } catch (error) {
            // console.log(error);
        }
    };

    return (
        <form onSubmit={onSubmit} className="tab-pane fade profile-edit pt-3" id="profile-edit">
            {isShowAlert && <Alert className="alert-success" title={message} />}
            {/* <!-- Profile Edit Form --> */}
            <div className="row mb-3">
                <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                <div className="col-md-8 col-lg-9">
                    <img src={previewImage} alt="Profile" />
                    <div className="pt-2">
                        <label htmlFor="profileImg" className="btn btn-primary btn-sm text-white" title="Upload new profile image"><i className="bi bi-upload"></i></label>
                        <input type="file" className="d-none" id="profileImg" onChange={e => chooseImage(e)} />
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Full Name</label>
                <div className="col-md-8 col-lg-9">
                    <input name="fullName" type="text" className="form-control" id="fullName" value={form.name} onChange={e => onChangeText('name', e.target.value)} />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">Role</label>
                <div className="col-md-8 col-lg-9">
                    <input disabled type="text" className="form-control" id="company" value={user.isAdmin} />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                <div className="col-md-8 col-lg-9">
                    <input type="email" className="form-control" id="Email" value={user.email} disabled />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="houseNumber" className="col-md-4 col-lg-3 col-form-label">House Number</label>
                <div className="col-md-8 col-lg-9">
                    <input type="text" className="form-control" id="houseNumber" value={form.houseNumber} onChange={e => onChangeText('houseNumber', e.target.value)} />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="City" className="col-md-4 col-lg-3 col-form-label">City</label>
                <div className="col-md-8 col-lg-9">
                    <input type="text" className="form-control" id="City" value={form.city} onChange={e => onChangeText('city', e.target.value)} />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="Address" className="col-md-4 col-lg-3 col-form-label">Address</label>
                <div className="col-md-8 col-lg-9">
                    <input type="text" className="form-control" id="Address" value={form.address} onChange={e => onChangeText('address', e.target.value)} />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                <div className="col-md-8 col-lg-9">
                    <input type="number" className="form-control" id="Phone" value={form.phoneNumber} onChange={e => onChangeText('phoneNumber', e.target.value)} />
                </div>
            </div>

            <div className="text-center">
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
            {/* <!-- End Profile Edit Form --> */}

        </form>
    )
}