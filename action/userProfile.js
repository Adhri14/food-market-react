import axios from "axios";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

export const getUserProfile = (token) => async (dispatch) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const userProfile = CryptoJS.AES.encrypt(res.data.data, "$3cR3t_Pr0f!l");
        Cookies.set('auth', userProfile);
        dispatch({ type: 'set_user_profile', value: res.data.data });
    } catch (error) {
        console.log(error.response);
    }
}