import actionUtil from "../lib/action-util";

export default (state = {
    phone: {},
    csrf: null
}, action = {}) => {
    switch (action.type) {
        case "CLEAR_AUTH_ERRORS":
            return {...state, error: null};
        case "ACCOUNT_KIT_GET_CSRF_PENDING":
            return {...state, error: null};
        case "ACCOUNT_KIT_GET_CSRF_REJECTED":
            return {...state, error: actionUtil.getError(action)};
        case "ACCOUNT_KIT_GET_CSRF_FULFILLED":
            return {
                ...state,
                csrf: actionUtil.getResponseData(action).csrf,
                error: null
            };
        case "ACCOUNT_KIT_GET_PHONE_PENDING":
            return {...state, error: null};
        case "ACCOUNT_KIT_GET_PHONE_REJECTED":
            return {...state, error: actionUtil.getError(action)};
        case "ACCOUNT_KIT_GET_PHONE_FULFILLED":
            return {
                ...state,
                phone: actionUtil.getResponseData(action).phone,
                error: null
            };
        default:
            return state;
    }
};
