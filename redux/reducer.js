import { combineReducers } from "redux";
import { setUserProfile } from "./user";
import { validationError } from "./validationError";

const reducer = combineReducers({
    validation: validationError,
    userProfile: setUserProfile,
});

export default reducer;