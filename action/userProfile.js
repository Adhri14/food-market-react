import axios from "axios";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

export const getUserProfile = (token) => async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const userProfile = CryptoJS.AES.encrypt(JSON.stringify(res.data.data), "user_profile");
        Cookies.set('token.local', userProfile);
    } catch (error) {
        // console.log(error.response);
    }
}