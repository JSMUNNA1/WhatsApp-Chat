import { LOGIN, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from './Actiontype';

const initialValue = {
    signup: null,
    signin: null,
    reqUser: null, // Initialize reqUser to null
    searchUser: null,
    updateUser: null
};

export const authReducer = (store = initialValue, { type, payload }) => {
    switch (type) {
        case REGISTER:
            return { ...store, signup: payload };
        case LOGIN:
            return { ...store, signin: payload };
        case REQ_USER:
             
            return { ...store, reqUser: payload }; // Assign payload to reqUser
        case SEARCH_USER:
            return { ...store, searchUser: payload };
        case UPDATE_USER:
            return { ...store, updateUser: payload };
        default:
            return store;
    }
};
