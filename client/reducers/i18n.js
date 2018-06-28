import actionUtil from "../lib/action-util";

// empty state for the i18n properties, all values would comes from the server side
export default (state = {translations: {}, locales: {}, initialize: false}, action = {}) => {
    switch (action.type) {
        case "I18N_INITIALZE_PENDING":
            return {translations: {}, locales: {}, initailize: false};
        case "I18N_INITIALZE_REJECTED":
            return {...state, error: actionUtil.getError(action)};
        case "I18N_INITIALIZE_FULFILLED":
            return {...actionUtil.getResponseData(action), initialize: true};
        case "I18N_SET_TRANSLATIONS":
            return {...state, translations: actionUtil.getResponseData(action).translations};
        default:
            return state;
    }
};
