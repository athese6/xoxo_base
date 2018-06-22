import React from "react";
import {connect} from "react-redux";
import autobind from 'autobind-decorator';
import Seo from "./components/seo";
import DraftJs from "./components/editor/draftwysiwyg";
// import DraftJs from "./components/draftjs/draftjs";
import {View, Input, Button, Label} from './components/base';

@connect(store => {
    return {
        i18n: store.i18n,
        layout: store.layout,
        auth: store.auth,
    };
})



export default class Board extends React.Component {

    render() {
        return (
            <View>
                <Seo/>
                <DraftJs/>
            </View>
        );
    }
}
//{/*<View display="flex" flexFlow="Row" width={"80%"}>*/}
//                 {/*<Seo title={"Board"}/>*/}
