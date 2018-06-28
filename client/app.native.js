import React, {Component} from 'react';
import {
    Platform
} from 'react-native';
// import {View, Text, Image, StyleSheet} from 'react-primitives';
import {Stack, Router, Scene, Actions} from 'react-native-router-flux';
import {connect, Provider} from 'react-redux';
import configureStore from "./store/configureStore";
import theme from "./theme/theme";
// import debug from "debug";
import moment from "moment";


import Landing from './src/landing';
import SMS from './src/sms';
import NoMatch from "./src/nomatch";
import Config from "react-native-config/index";
import PropTypes from "prop-types";


const ConnectedRouter = connect()(Router);
// console.ignoredYellowBox = ['Remote debugger'];


// const TabIcon = ({selected, title}) => {
//     return (
//         <Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>
//     )
// };

const Scenes = Actions.create(
    <Scene key="root" hideNavBar hideTabBar>
        <Scene key="landing" component={Landing} title="Landing" initial={true}/>
    </Scene>
);

export default class App extends Component {
    constructor(props) {
        super(props);
        const store = configureStore(props.init);
        this.state = {store: store};
    }

    componentDidMount() {
        console.log("loaded : App");
        console.log("load %s", Platform.OS, Platform.Version);
        console.log("Config.BUILD_MODE : " + Config.BUILD_MODE);
    }

    render() {
        console.log("versionCode" + Config.ENV_VERSION_CODE);
        return (
            <Provider store={this.state.store}>
                <ConnectedRouter>
                    <Scene key="root" hideNavBar hideTabBar>
                        <Scene key="landing" component={Landing} title="Landing" initial={true}/>
                        <Scene key="sms" component={SMS} title="SMS"/>
                        <Scene key="nomatch" component={NoMatch} title="NoMatch"/>
                    </Scene>
                </ConnectedRouter>
            </Provider>
        );
    }
}

App.propTypes = {
    init: PropTypes.object
};

App.defaultProps = {
    init: {}
};
