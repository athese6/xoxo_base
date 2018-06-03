import React from "react";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import Seo from "./components/seo";
import autobind from 'autobind-decorator';
import base from './components/base';

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
        auth: store.auth
    };
})
export default class SMSLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("loaded : SMSLayout");
        const {dispatch} = this.props;

        console.log("clientType : " + process.env.REACT_APP_CLIENT_TYPE);
        console.log("fbid : " + process.env.REACT_APP_FACEBOOK_APP_ID);
        const script = document.createElement("script");
        script.src = "https://sdk.accountkit.com/en_US/sdk.js";
        document.body.appendChild(script);


    }

    componentDidUpdate() {
    }

    @autobind
    smsLogin() {

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
