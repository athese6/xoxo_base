import Promise from "bluebird";
import api from "../lib/api";

export default {
    initialize: () => dispatch => {
        // dispatch(layoutActions.showLoadingView());
        dispatch({
            type: "I18N_INITIALIZE", payload: new Promise((resolve, reject) => {
                api.get("/auth/initialize_i18n")
                    .then(payload => {
                        // dispatch(layoutActions.hideLoadingView());
                        resolve(payload);
                    })
                    .catch(err => {
                        reject(err);
                        // dispatch(layoutActions.hideLoadingView());
                    });
            })
        }).catch((e) => {
        });
    },
}
