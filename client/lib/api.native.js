import axios, {CancelToken} from "axios";

const constants = require("./constants.json");
const config = require("../../config/config");

const api = axios.create({
    baseURL: `${config.app.contextName}:${config.app.port}${constants.api.baseUrl}`,
    timeout: constants.api.timeout,
    headers: constants.api.headers
});

export default api;

const token = {
    get: name => new CancelToken(cancel => token.items.push({
            name: name,
            cancel: cancel
        })
    ),
    cancel: (...names) => {
        token.items = token.items.filter(item => {
            if (names.indexOf(item.name) >= 0) {
                try {
                    item.cancel(`API call for '${item.name}' has been canceled!`);
                } catch (e) {
                    console.log(e);
                }
                return false;
            }
            return true;
        })
    },
    items: []
};

export const Token = token;

export const isCancel = payload => payload && axios.isCancel(payload);
