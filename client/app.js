// import Loadable from 'react-loadable';
// const AsyncComponent = Loadable({
//     loader: () => import(/* webpackChunkName: "myNamedChunk" */ './SomeComponent'),
//     loading: () => <div>loading...</div>,
//     modules: ['myNamedChunk'],
// });
import React from "react";
import {Provider} from "react-redux";
import {Router, Route, Switch, Redirect} from "react-router";
// import {ThemeProvider} from "styled-components";
import Landing from "./src/landing";
import SMS from "./src/sms";
import NoMatch from "./src/nomatch";
// import autobind from "autobind-decorator";
// import Async from "react-code-splitting";
// const BodyHomeManage = () => <Async load={import('./app/body/home-manage')}/>;


export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actualWidth: 1650,
            actualHeight: 0,
            settingWidth: 1650,
        };
        // console.log(process.clientType)
    }

    render() {
        const {store, history, theme} = this.props;
        const state = store.getState();
        const {auth, i18n} = state;
        const isAdmin = auth.user.role && auth.user.role === "admin";
        const {locales} = i18n;
        const path = "";
        let newTheme = Object.assign({}, theme, this.state);
        return (
            <Provider store={store}>
                {/*<ThemeProvider theme={newTheme}>*/}
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/" component={Landing}/>
                            <Route path="/sms" component={SMS}/>
                            <Route component={NoMatch}/>
                        </Switch>
                    </Router>
                {/*</ThemeProvider>*/}
            </Provider>
        )
    }
}
