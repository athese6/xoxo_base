import React from "react";
import {
    Platform
} from 'react-native';
import {connect} from "react-redux";
import {View, Text, Image, StyleSheet} from 'react-primitives';
import debug from "debug";
import moment from "moment";
import {Crashlytics, Answers} from 'react-native-fabric';
import styles from "./landing.styles";
import Config from 'react-native-config';
import {Stack, Router, Scene, Actions, ActionConst} from 'react-native-router-flux';
import base from "./components/base";
import autobind from "autobind-decorator";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
//
// @connect(store => {
//     return {
//         i18n: store.i18n,
//         layout: store.layout,
//         auth: store.auth
//     };
// })
export default class LandingLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        console.log("loaded : LandingLayout");
        console.log("Config.BUILD_MODE : " + Config.BUILD_MODE);
        Crashlytics.setUserName('Test Henry');
        Crashlytics.setString('Test', moment().format('MMMM Do YYYY, h:mm:ss a'));
        Answers.logCustom('Test_Answer_log', {time: "111a"});
        Answers.logSignUp('Test_Local', true);
    }

    componentDidUpdate() {
    }

    onButtonPress() {
        this.doSomething();
    }

    doSomething() {
        console.log('doing something');
    }

    render() {
        // debug("load %s %s", Platform.OS, Platform.Version);
        console.log("load %s", Platform.OS, Platform.Version);
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {"Welcome to React Native! : " + moment().format('MMMM Do YYYY, h:mm:ss a')}
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>
                <Text onPress={this.onButtonPress} style={styles.instructions}>
                    {instructions}
                </Text>
                {/*<a className="waves-effect waves-light btn">button</a>*/}
                {/*<button className="" onClick={() => console.log("adaada123")}>button123</button>*/}
                {/*<Button onClick={() => console.log("bbbb")} text={"gogogogogo"}/>*/}
                {/*<a onClick={() => Actions.push(sms, {a: "11"})}>Go to sms</a>*/}
                <Text onPress={() => Actions.sms()}>{"Go to Register page"}</Text>
                {/*<Button onPress={Actions.register2}>Go to Register page without animation</Button>*/}
                {/*<Button onPress={() => Actions.error("Error message")}>Go to Error page</Button>*/}
            </View>
        );
    }
}

