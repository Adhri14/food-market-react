import axios from "axios";

export const getUserProfile = (token) => async (dispatch) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        console.log(res);
        dispatch({ type: 'set_user_profile', value: res.data.data });
    } catch (error) {
        console.log(error.response);
    }
}