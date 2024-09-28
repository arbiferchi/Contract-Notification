//import

import { CLEAR_ERRORS, CURRENT_USER, FAIL_USER, GET_USERS, LOAD_USER, LOGOUT_USER, SUCCESS_USER } from "../actionTypes/user";




const initialState = {
    listUsers: [],
    user: null,
    loadUser: false,
    errors: null,
    isAuth: false
};

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_USER:
            return { ...state, loadUser: true };
        case SUCCESS_USER:
            localStorage.setItem("token", payload.token);
            return { ...state, loadUser: false, user: payload.user, isAuth: true };
        case GET_USERS:
            return { ...state, loadUser: false, listUsers: payload.listUsers, isAuth: true };
        case CURRENT_USER:
            return { ...state, user: payload, loadUser: false, isAuth: true }; 
        case LOGOUT_USER:
            localStorage.removeItem("token");
            return initialState;
        case FAIL_USER:
            return { ...state, loadUser: false, errors: payload };
        case CLEAR_ERRORS:
            return { ...state, errors: null };
        default:
            return state;
    }
};

export default userReducer;