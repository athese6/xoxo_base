import actionUtil from "../lib/action-util";

export default (state = {
    isAuthenticated: false,
    user: {},
    error: null
}, action = {}) => {
    switch (action.type) {
        case "CLEAR_AUTH_ERRORS":
            return {...state, success: {}, error: null};
        case "AUTH_CHANGE_LANGUAGE_PENDING":
            return {...state, success: {...state.success, lang: false}, error: null};
        case "AUTH_CHANGE_LANGUAGE_REJECTED":
            return {...state, error: actionUtil.getError(action)};
        case "AUTH_CHANGE_LANGUAGE_FULFILLED":
            return {
                ...state,
                success: {...state.success, lang: true},
                user: {...state.user, lang: actionUtil.getResponseData(action).lang},
                error: null
            };
        case "AUTH_LOGIN_WITH_FACEBOOK_PENDING":
            return {...state, error: null};
        case "AUTH_LOGIN_WITH_FACEBOOK_REJECTED":
            return {...state, error: actionUtil.getError(action)};
        case "AUTH_LOGIN_WITH_FACEBOOK_FULFILLED":
            return {
                ...state,
                user: actionUtil.getResponseData(action).user,
                error: null
            };
        case "AUTH_LOGOUT_PENDING":
            return {...state, error: null};
        case "AUTH_LOGOUT_REJECTED":
            return {...state, error: actionUtil.getError(action)};
        case "AUTH_LOGOUT_FULFILLED":
            return {
                ...state,
                isAuthenticated: false,
                user: {lang: state.user.lang},
                error: null
            };
        case "AUTH_SUBSCRIPTION_PENDING":
            return {...state, error: null};
        case "AUTH_SUBSCRIPTION_REJECTED":
            return {...state, error: actionUtil.getError(action)};
        case "AUTH_SUBSCRIPTION_FULFILLED":
            return {
                ...state,
                user: actionUtil.getResponseData(action).user,
                error: null
            };
        default:
            return state;
    }
};
