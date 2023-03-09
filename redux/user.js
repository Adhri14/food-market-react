const initUser = {
    name: '',
    email: '',
    picturePath: '',
    phoneNumber: '',
    address: '',
    houseNumber: '',
    city: '',
    isAdmin: '',
}

export const setUserProfile = (state = initUser, action) => {
    if (action.type === 'set_user_profile') {
        return {
            ...state,
            name: action.value.name,
            email: action.value.email,
            picturePath: action.value.picturePath,
            phoneNumber: action.value.phoneNumber,
            address: action.value.address,
            houseNumber: action.value.houseNumber,
            city: action.value.city,
            isAdmin: action.value.isAdmin,
        }
    }

    if (action.type === 'clear_user_profile') {
        return initUser;
    }
    return state;
}