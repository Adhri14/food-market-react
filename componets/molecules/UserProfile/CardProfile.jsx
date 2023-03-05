import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useSelector } from "react-redux";

export default function CardProfile() {
    const user = useSelector(state => state.userProfile);
    // const getUser = Cookies.get('_auth');
    // const user = CryptoJS.AES.decrypt(getUser, "$3cR3t_Pr0f!l");
    return (
        <div className="col-xl-4">

            <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

                    <img src={`${process.env.NEXT_PUBLIC_IMG}/${user.picturePath}`} alt="Profile" className="rounded-circle" />
                    <h2>{user.name}</h2>
                    <h3>{user.isAdmin}</h3>
                </div>
            </div>

        </div>
    )
}