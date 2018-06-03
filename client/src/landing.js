import React from "react";
import {connect} from "react-redux";
import autobind from "autobind-decorator";
import {push} from "react-router-redux";
import moment from "moment";
import Seo from "./components/seo";
import base from "./components/base";
import authAction from "../actions/auth";

const Utils = base.Utils;
const Button = base.Button;
const Div = base.View;

// Utils.isReactNative() ? {} : {}


@connect(store => {
    return {
        i18n: store.i18n,
        lang: store.i18n.translations,
        layout: store.layout,
        auth: store.auth
    };
})

export default class LandingLayout extends React.Component {
    constructor(props) {
        super(props);
        // if (process.window) {
        //     (function (d, s, id) {
        //         let js, fjs = d.getElementsByTagName(s)[0];
        //         if (d.getElementById(id)) {
        //             return;
        //         }
        //         js = d.createElement(s);
        //         js.id = id;
        //         // js.src = "https://connect.facebook.net/en_US/sdk.js";
        //         js.src = "https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.10&appId=1319335018187741";
        //         // js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.10&appId=1319335018187741";
        //         fjs.parentNode.insertBefore(js, fjs);
        //     }(document, 'script', 'facebook-jssdk'));
        // }
    }

    componentDidMount() {
        const {dispatch, lang} = this.props;
        console.log("loaded : LandingLayout : " + lang["language"]);
        if (Utils.isReactNative()) {
            console.log("loaded : LandingLayout");
            // console.log("Config.BUILD_MODE : " + Config.BUILD_MODE);
            // Crashlytics.setUserName('Test Henry');
            // Crashlytics.setString('Test', moment().format('MMMM Do YYYY, h:mm:ss a'));
            // Answers.logCustom('Test_Answer_log', {time: "111a"});
            // Answers.logSignUp('Test_Local', true);
        }
        // GA.logPageView();
        // window.fbAsyncInit = function () {
        //     FB.init({
        //         appId: '1319335018187741',
        //         cookie: true,
        //         // cookie: false,
        //         xfbml: true,
        //         version: 'v2.10'
        //     });
        //     FB.AppEvents.logPageView();
        //
        //     // FB.getLoginStatus(function (response) {
        //     //     if (response.status === 'connected') {
        //     //         if (response.authResponse != 'undefined') {
        //     //             // window.location = '<?php echo $base_url; ?>register';
        //     //             console.log('response.authResponse');
        //     //         }
        //     //     } else if (response.status === 'not_authorized') {
        //     //         console.log('not_authorized');
        //     //         //it means we have a user but he hasn't granted any permissions to our app
        //     //         //we're going to redirect him to the permission page
        //     //         // window.location = 'https://www.facebook.com/dialog/oauth?client_id=456109407732505&response_type=code&redirect_uri=<?php echo $base_url; ?>register&scope=email,publish_actions,user_likes';
        //     //     } else {
        //     //         console.log("the user is not logged in, as you already have a login button you don't have to do nothing");
        //     //         //the user is not logged in, as you already have a login button you don't have to do nothing
        //     //     }
        //     // });
        //
        //     const fields = "id,name,email,last_name,first_name,gender,locale,picture.width(200).height(200).as(picture)";
        //     FB.Event.subscribe('auth.statusChange', function (response) {
        //         // example implementation
        //         if (response.authResponse) {
        //             console.log('Welcome!  Fetching your information.... ');
        //             console.log(response.authResponse.accessToken);
        //             FB.api('/me', {fields: fields}, function (response) {
        //                 console.log(response);
        //                 console.log('Good to see you, ' + response.name + '.');
        //                 dispatch(authActions.loginWithFacebook(response));
        //             });
        //         } else {
        //             console.log('User cancelled login or did not fully authorize.');
        //             dispatch(authActions.logout());
        //         }
        //     });
        // }.bind(this);
    }

    componentDidUpdate() {
    }


    // render() {
    //     const {layout, children, notification} = this.props;
    //     return (
    //         <div id="main">
    //             {this.props.children}
    //             <div style={{height: "200px", width: "100px", backgroundColor: "red"}}></div>
    //             {/*{layout.showLoading ? <Preloader/> : null}*/}
    //         </div>
    //     )
    // }

    @autobind
    goToSMS(event) {
        this.props.dispatch(push("/sms"));
        event.preventDefault();
        return false;
    }

    @autobind
    loglog(event) {
        console.log("gogogogogo123123");
        event.preventDefault();
        return false;
    }

    @autobind
    actionTest(event) {
        const {dispatch} = this.props;
        dispatch(authAction.clearAuthErrors());
        event.preventDefault();
        return false;
    }

    render() {
        // console.log("load %s", Platform.OS, Platform.Version);
        return (
            <Div>
                <Seo/>
                <Button color={"yellow"} onClick={this.goToSMS}>button</Button>
                <Button color={"green"} onClick={this.loglog}>button123</Button>
                <Button color={"blue"} onClick={this.actionTest}>button123</Button>
            </Div>
        );
    }
}
