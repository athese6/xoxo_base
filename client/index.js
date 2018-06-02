import 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from "./app.js";
import configureStore from "./store/configureStore";
import theme from "./theme/theme";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();
let store;
const render = App => {
    const element = document.getElementById("root");
    console.log(element);
    if (element) {
        const state = JSON.parse(store ? JSON.stringify(store.getState()) : element.getAttribute("data-state") || "{}");
        store = configureStore(state, history);
        element.removeAttribute("data-state");

        ReactDOM.render(<App store={store} history={history}
                             theme={theme}/>, element.childNodes[0] || element);
    }
};

// $(document).ready(function () {
// GA.init();
// window.initDropDownFix();
render(App);
module.hot && module.hot.accept('./app', () => render(require('./app').App));
// });


// window.onload = () => {
//     Loadable.preloadReady().then(() => {
//         // ReactDOM.hydrate(  this is for ssr
//         ReactDOM.render(
//             AppBundle,
//             document.getElementById('root')
//         );
//     });
// };

// const root = document.querySelector('#root');
// ReactDOM.render(AppBundle, root);


// registerServiceWorker();
