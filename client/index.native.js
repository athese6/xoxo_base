import {AppRegistry, Platform} from 'react-native';
import App from './app.native';
import configureStore from "./store/configureStore";
import theme from "./theme/theme";
import ReactDOM from "react-dom";
import layoutActions from "./actions/layout";
import api from "./lib/api";
import axios, {CancelToken} from "axios";
// import debug from "debug";

// console.log("load11 %s", Platform.OS, Platform.Version);
// debug("load11 %s %s", Platform.OS, Platform.Version);
// console.ignoredYellowBox = ['Remote debugger'];


// const render = App => {
AppRegistry.registerComponent('XOXO', () => App);
// };
//
// axios({
//     method: 'get',
//     url: 'http://localhost:8000/api/auth/initialize',
//     headers: {'X-Requested-With': 'XMLHttpRequest'}
// })
//     .then(payload => {
//         console.log(payload);
//         App.defaultProps = payload.data;
//         render(App);
//     })
//     .catch(err => {
//         console.log(err);
//     });
// render(App);
