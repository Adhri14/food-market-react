import { combineReducers } from "redux";
import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setUserProfile } from "./user";
import { validationError } from "./validationError";

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistCombineReducers(persistConfig, {
    userProfile: setUserProfile,
});

const reducer = combineReducers({
    validation: validationError,
    userProfile: setUserProfile
});

export {
    persistedReducer,
    reducer,
}