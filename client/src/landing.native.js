import React from "react";
import {
    Platform
} from 'react-native';
import {connect} from "react-redux";
import SplashScreen from 'react-native-splash-screen';
import moment from "moment";
import {Crashlytics, Answers} from 'react-native-fabric';
import Config from 'react-native-config';
import {Stack, Router, Scene, Actions, ActionConst} from 'react-native-router-flux';
import autobind from "autobind-decorator";
import {Utils, Button, View, Text} from './components/base';
import {Auth, I18n} from '../actions';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// @connect(store => {
//     return {
//         i18n: store.i18n,
//         lang: store.i18n.translations,
//         layout: store.layout,
//         auth: store.auth
//     };
// })

class LandingLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch, lang} = this.props;
        console.log("loaded : LandingLayout");
        console.log("Config.BUILD_MODE : " + Config.BUILD_MODE);
        Crashlytics.setUserName('Test Henry');
        Crashlytics.setString('Test', moment().format('MMMM Do YYYY, h:mm:ss a'));
        Answers.logCustom('Test_Answer_log', {time: "111a"});
        Answers.logSignUp('Test_Local', true);

        console.log("loaded : LandingLayout : " + lang["language"]);
        if (Utils.isReactNative()) {
            console.log("loaded : LandingLayout 야야야");
            // console.log("Config.BUILD_MODE : " + Config.BUILD_MODE);
            // Crashlytics.setUserName('Test Henry');
            // Crashlytics.setString('Test', moment().format('MMMM Do YYYY, h:mm:ss a'));
            // Answers.logCustom('Test_Answer_log', {time: "111a"});
            // Answers.logSignUp('Test_Local', true);
        }

        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        dispatch(Auth.initialize());
        dispatch(I18n.initialize());
    }

    componentDidUpdate() {
        const {i18n, auth} = this.props;
        if (i18n.initialize && auth.initialize) {
            setTimeout(() => {
                SplashScreen.hide();
            }, 3000);

        }
    }

    doSomething() {
        console.log('doing something');
    }

    render() {
        // debug("load %s %s", Platform.OS, Platform.Version);
        const {lang} = this.props;
        console.log("loaded : LandingLayout : " + lang["language"]);
        console.log("load %s", Platform.OS, Platform.Version);
        return (
            <View>
                {/*<Button color={"yellow"} onPress={this.doSomething}>button</Button>*/}
                {/*<Button color={"green"} onPress={this.doSomething}>button123</Button>*/}
                <Button
                    raised
                    onPress={this.doSomething}
                    buttonStyle={{backgroundColor: 'red', borderRadius: 10}}
                    textStyle={{textAlign: 'center'}}
                    title={`Welcome to\nReact Native Elements`}
                    accessibilityLabel="Learn more about this purple button"
                />

                <Text onPress={this.doSomething}>
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

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch,
    // startup: () => dispatch(StartupActions.startup())
});


function mapStateToProps(state) {
    return {
        i18n: state.i18n,
        lang: state.i18n.translations,
        layout: state.layout,
        auth: state.auth
    }
}

// const mapStateToProps = (state, ownProps = {}) => {
//     console.log(state); // state
//     console.log(ownProps); // undefined
// };
// const mapStateToProps = (state) => ({
//     i18n: state.i18n,
//     lang: state.i18n.translations,
//     layout: state.layout,
//     auth: state.auth
// });

export default connect(mapStateToProps, mapDispatchToProps)(LandingLayout)
