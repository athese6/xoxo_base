import Promise from "bluebird";
import api from "../lib/api";
// import device from "../device";
import layoutActions from "./layout";
import {push} from "react-router-redux";

export default {
    clearAuthErrors: () => ({type: "CLEAR_AUTH_ERRORS"}),
    changeLanguage: lang => dispatch => {
        dispatch(layoutActions.showLoadingView());
        dispatch({
            type: "AUTH_CHANGE_LANGUAGE", payload: new Promise((resolve, reject) => {
                api.post("/user/change-language", {lang: lang})
                    .then(payload => {
                        dispatch({type: "I18N_SET_TRANSLATIONS", payload: payload});
                        dispatch(layoutActions.hideLoadingView());
                        // device.setLocale(lang);
                        resolve(payload);
                    })
                    .catch(err => {
                        reject(err);
                        dispatch(layoutActions.hideLoadingView());
                    });
            })
        }).catch((e) => {
        });
    },
    loginWithFacebook: facebookUser => dispatch => {
        dispatch(layoutActions.showLoadingView());
        dispatch({
            type: "AUTH_LOGIN_WITH_FACEBOOK", payload: new Promise((resolve, reject) => {
                api.get("/auth/facebook")
                    .then(payload => {
                        dispatch(layoutActions.hideLoadingView());
                        resolve(payload);
                    })
                    .catch(err => {
                        reject(err);
                        dispatch(layoutActions.hideLoadingView());
                    });
                // api.post("/user/login-with-facebook", {facebookUser: facebookUser})
                //     .then(payload => {
                //         dispatch(layoutActions.hideLoadingView());
                //         resolve(payload);
                //     })
                //     .catch(err => {
                //         reject(err);
                //         dispatch(layoutActions.hideLoadingView());
                //     });
            })
        }).catch((e) => {
        });
    },
    logout: () => dispatch => {
        dispatch(layoutActions.showLoadingView());
        dispatch({
            type: "AUTH_LOGOUT", payload: new Promise((resolve, reject) => {
                api.post("/user/logout")
                    .then(payload => {
                        dispatch(layoutActions.hideLoadingView());
                        resolve(payload);
                    })
                    .catch(err => {
                        reject(err);
                        dispatch(layoutActions.hideLoadingView());
                    });
            })
        }).catch((e) => {
        });
    },
    subscription: data => dispatch => {
        dispatch(layoutActions.showLoadingView());
        dispatch({
            type: "AUTH_SUBSCRIPTION", payload: new Promise((resolve, reject) => {
                api.post("/user/subscription", data)
                    .then(payload => {
                        dispatch(layoutActions.hideLoadingView());
                        resolve(payload);
                    })
                    .catch(err => {
                        reject(err);
                        dispatch(layoutActions.hideLoadingView());
                    });
            })
        }).catch((e) => {
        });
    },

}
