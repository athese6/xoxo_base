import React from "react";
import {connect} from "react-redux";
import autobind from 'autobind-decorator';
import Seo from "./components/seo";
import {View, Input, Button, Label} from './components/base';
import Dropzone from "./components/dropzone";

@connect(store => {
    return {
        i18n: store.i18n,
        layout: store.layout,
        auth: store.auth,
    };
})
export default class UserProfileLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("loaded : UserProfileLayout");
        const {dispatch} = this.props;
    }

    componentDidUpdate() {
    }


    render() {
        const eventhadlers = {
            init: dz => this.dropzone = dz,
            addedfile: this.handleFileAdded,
            uploadprogress: this.uploadprogress,
            renameFilename: this.renameFilename
        };
        return (
            <View display="flex" flexFlow="Row">
                <Seo title={"User Profile"}/>
                <View id="profile" className={"click-pointer"} width={"200px"} height={"200px"}
                      backgroundColor={"red"}>
                </View>
                <Dropzone filename={"test123123123"}/>
            </View>

        );
    }
}

/*/
<Flexbox flexDirection="column" minHeight="100vh">

                <Flexbox element="header" height="60px">
                    Header
                </Flexbox>

                <Flexbox flexGrow={1}>
                    Content
                </Flexbox>

                <Flexbox element="footer" height="60px">
                    Footer
                </Flexbox>
            </Flexbox>
 */
