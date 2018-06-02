import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import promise from "redux-promise-middleware";
import {applyMiddleware} from "redux";
import {routerMiddleware} from "react-router-redux";


export default history => {
    const routeMiddleware = routerMiddleware(history);
    const logger = createLogger({
        predicate: () => process.env.NODE_ENV === 'development',
    });
    // const middleWares = [promise(), thunk, routeMiddleware, logger];

    return applyMiddleware(promise(), thunk, routeMiddleware, logger)
}
