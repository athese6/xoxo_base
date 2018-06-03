import React from "react";
import {connect} from "react-redux";
import Seo from "./components/seo";
import autobind from 'autobind-decorator';
import base from './components/base';
import facebookActions from "../actions/facebook";

const Div = base.View;
const Button = base.Button;
const Input = base.Input;
// import {View, Text, Image, StyleSheet} from 'react-primitives';
// import moment from "moment";
// import styles from "./sms.styles";
// import Box from "../styled-components";

@connect(store => {
    return {
        i18n: store.i18n,
        layout: store.layout,
        auth: store.auth,
        facebook: store.facebook
    };
})
export default class SMSLayout extends React.Component {
    getCsrf = false;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("loaded : SMSLayout");
        const {dispatch} = this.props;

        console.log("clientType : " + process.env.REACT_APP_CLIENT_TYPE);
        console.log("fbid : " + process.env.REACT_APP_FACEBOOK_APP_ID);
        dispatch(facebookActions.getCsrf());
    }

    componentDidUpdate() {
        const {facebook} = this.props;

        if (facebook.csrf && !this.getCsrf && !window.AccountKit) {
            this.getCsrf = true;
            (cb => {
                const tag = document.createElement("script");
                tag.setAttribute(
                    "src",
                    `https://sdk.accountkit.com/ko_KR/sdk.js`
                    // `https://sdk.accountkit.com/${this.props.language}/sdk.js`
                );
                tag.setAttribute("id", "account-kit");
                tag.setAttribute("type", "text/javascript");
                tag.onload = cb;
                document.head.appendChild(tag);
            })(() => {
                window.AccountKit_OnInteractive = this.onLoad.bind(this);
            });
        }
    }

    onLoad() {
        window.AccountKit.init({
            appId: process.env.REACT_APP_FACEBOOK_APP_ID,
            state: this.props.facebook.csrf,
            version: process.env.REACT_APP_FACEBOOK_APP_ACCOUNT_KIT_API_VERSION,
            fbAppEventsEnabled: true
        });
    }

    loginCallback(response) {
        console.log(response);
        if (response.status === "PARTIALLY_AUTHENTICATED") {
            var code = response.code;
            var csrf = response.state;
            this.props.dispatch(facebookActions.getPhone(response));
            // Send code to server to exchange for access token
        }
        else if (response.status === "NOT_AUTHENTICATED") {
            // handle authentication failure
        }
        else if (response.status === "BAD_PARAMS") {
            // handle bad parameters
        }
    }

    // phone form submission handler
    @autobind
    smsLogin() {
        // var countryCode = document.getElementById("country_code").value;
        // var phoneNumber = document.getElementById("phone_number").value;
        window.AccountKit.login(
            'PHONE',
            {countryCode: "+82", phoneNumber: "01042070424"}, // will use default values if not specified
            this.loginCallback.bind(this)
        );
    }

    render() {
        return (
            <Div>
                <Seo title={"aadsfsfsfsfsfsfsfs"}/>
                <Input defaultValue="+82" id="country_code"/>
                <Input placeHolder="phone number" id="phone_number"/>
                <Button onClick={this.smsLogin}>Login via SMS</Button>
            </Div>
        );
    }
}
