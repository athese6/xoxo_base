import Promise from "bluebird";
import api from "../lib/api";
import layoutActions from "./layout";
import {push} from "react-router-redux";

export default {
    clearAuthErrors: () => ({type: "CLEAR_AUTH_ERRORS"}),
    getCsrf: data => dispatch => {
        dispatch(layoutActions.showLoadingView());
        dispatch({
            type: "ACCOUNT_KIT_GET_CSRF", payload: new Promise((resolve, reject) => {
                api.get("/facebook/get-csrf", data)
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
    getPhone: data => dispatch => {
        dispatch(layoutActions.showLoadingView());
        dispatch({
            type: "ACCOUNT_KIT_GET_PHONE", payload: new Promise((resolve, reject) => {
                api.post("/facebook/get-phone", data)
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
