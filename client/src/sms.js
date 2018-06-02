import React from "react";
import {connect} from "react-redux";
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
    }

    componentDidUpdate() {
    }


    render() {
        return (
            <div>
                <h1>
                    {"SMSLayout"}
                </h1>
            </div>
        );
    }
}
