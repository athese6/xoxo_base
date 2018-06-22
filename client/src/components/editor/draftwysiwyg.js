import React from "react";
import {connect} from "react-redux";
import autobind from 'autobind-decorator';
import {View, Input, Button, Label} from '../base';
import sampleData from './sampleData';
import {EditorState, convertFromRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import ColorPic from './colorPic';

const positionSuggestions = ({state, props}) => {
    let transform;
    let transition;

    if (state.isActive && props.suggestions.length > 0) {
        transform = 'scaleY(1)';
        transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
    } else if (state.isActive) {
        transform = 'scaleY(0)';
        transition = 'all 0.25s cubic-bezier(.3,1,.2,1)';
    }

    return {
        transform,
        transition,
    };
};

const Entry = (props) => {
    const {
        mention,
        theme,
        searchValue, // eslint-disable-line no-unused-vars
        isFocused, // eslint-disable-line no-unused-vars
        ...parentProps
    } = props;

    return (
        <div {...parentProps}>
            <div className={"mentionSuggestionsEntryContainer"}>
                <div className={"mentionSuggestionsEntryContainerLeft"}>
                    <img
                        src={mention.avatar}
                        className={"mentionSuggestionsEntryAvatar"}
                        role="presentation"
                    />
                </div>

                <div className={"mentionSuggestionsEntryContainerRight"}>
                    <div className={"mentionSuggestionsEntryText"}>
                        {mention.name}
                    </div>

                    <div className={"mentionSuggestionsEntryTitle"}>
                        {mention.title}
                    </div>
                </div>
            </div>
        </div>
    );
};

// @connect(store => {
//     return {
//         i18n: store.i18n,
//         layout: store.layout,
//         auth: store.auth,
//     };
// })


export default class DraftJs extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            // editorState: EditorState.createEmpty(),
            editorState: EditorState.createWithContent(convertFromRaw(sampleData.initialState)),
            suggestions: sampleData.mentions
        };
    }

    componentDidMount() {
        console.log("loaded : DraftJs");
        const {dispatch} = this.props;
    }

    componentDidUpdate() {
    }

    @autobind
    onEditorStateChange(editorState) {
        let state = editorState;
        this.setState({
            editorState: state
        });
    }

    // @autobind
    // onSearchChange({value}) {
    //     this.setState({
    //         suggestions: defaultSuggestionsFilter(value, sampleData.mentions),
    //     });
    // };
    //
    // @autobind
    // onAddMention() {
    //     // get the mention object selected
    // };

    uploadImageCallBack(file) {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.imgur.com/3/image');
                xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }


    render() {

        const {editorState, suggestions} = this.state;
        // const {MentionSuggestions} = mentionPlugin;

        return (
            <View width={"80%"}>
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                    editorRef={element => this.editor = element}
                    onFocus={() => {
                    }}
                    onBlur={() => {
                    }}
                    onTab={() => {
                    }}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'history'],
                        fontSize: {
                            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                        },
                        fontFamily: {
                            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                        },
                        image: {uploadCallback: this.uploadImageCallBack, alt: {present: false, mandatory: false}},
                        colorPicker: {component: ColorPic}
                    }}
                    mention={{
                        separator: ' ',
                        trigger: '@',
                        suggestions: [
                            {text: 'APPLE', value: 'apple', url: 'apple'},
                            {text: 'BANANA', value: 'banana', url: 'banana'},
                            {text: 'CHERRY', value: 'cherry', url: 'cherry'},
                            {text: 'DURIAN', value: 'durian', url: 'durian'},
                            {text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit'},
                            {text: 'FIG', value: 'fig', url: 'fig'},
                            {text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit'},
                            {text: 'HONEYDEW', value: 'honeydew', url: 'honeydew'},
                        ],
                    }}
                    hashtag={{
                        separator: ' ',
                        trigger: '#',
                    }}
                />
            </View>
        );
    }
}
