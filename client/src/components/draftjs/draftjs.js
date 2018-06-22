import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import autobind from 'autobind-decorator';
import config from '../../../lib/constants';
import {View, Input, Button, Label, Text, Pre, Span, Image, Select, Option} from '../base';
import sampleData from './sampleData';
import draftToHtml from 'draftjs-to-html';
import Editor, {composeDecorators} from 'draft-js-plugins-editor';
import {EditorState, convertFromRaw, convertToRaw, RichUtils} from 'draft-js';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMentionPlugin, {defaultSuggestionsFilter} from 'draft-js-mention-plugin';
import createToolbarPlugin, {Separator} from 'draft-js-static-toolbar-plugin';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from 'draft-js-buttons';
import createImagePlugin from 'draft-js-image-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createUndoPlugin from 'draft-js-undo-plugin';
import createVideoPlugin from 'draft-js-video-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
// import createEmbedPlugin from 'last-draft-js-plugins/draft-js-link-plugin';
import {stateToHTML} from 'draft-js-export-html';
import createStyles from 'draft-js-custom-styles';

const customStyleMap = {
    MARK: {
        backgroundColor: 'Yellow',
        fontStyle: 'italic',
    },
};

const {styles, customStyleFn, exporter} = createStyles(['font-size', 'color', 'text-transform'], 'CUSTOM_', customStyleMap);


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
        <View {...parentProps}>
            <View className={"mentionSuggestionsEntryContainer"}>
                <View className={"mentionSuggestionsEntryContainerLeft"}>
                    <Image
                        src={mention.avatar}
                        className={"mentionSuggestionsEntryAvatar"}
                        role="presentation"
                    />
                </View>

                <View className={"mentionSuggestionsEntryContainerRight"}>
                    <View className={"mentionSuggestionsEntryText"}>
                        {mention.name}
                    </View>

                    <View className={"mentionSuggestionsEntryTitle"}>
                        {mention.title}
                    </View>
                </View>
            </View>
        </View>
    );
};


class HeadlinesPicker extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            window.addEventListener('click', this.onWindowClick);
        });
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onWindowClick);
    }

    onWindowClick = () =>
        // Call `onOverrideContent` again with `undefined`
        // so the toolbar can show its regular content again.
        this.props.onOverrideContent(undefined);

    render() {
        const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
        return (
            <View>
                {buttons.map((Button, i) => // eslint-disable-next-line
                    <Button key={i} {...this.props} />
                )}
            </View>
        );
    }
}

class HeadlinesButton extends React.Component {
    onClick = () =>
        // A button can call `onOverrideContent` to replace the content
        // of the toolbar. This can be useful for displaying sub
        // menus or requesting additional information from the user.
        this.props.onOverrideContent(HeadlinesPicker);

    render() {
        return (
            <div className={"headlineButtonWrapper"}>
                <Button onClick={this.onClick} className={"headlineButton"}>
                    Hh
                </Button>
            </div>
        );
    }
}


const hashtagPlugin = createHashtagPlugin();
const linkifyPlugin = createLinkifyPlugin({
    component: (props) =>
        // eslint-disable-next-line no-alert, jsx-a11y/anchor-has-content
    {
        const {href} = props;
        return <a {...props} onClick={() => {
            window.open(href, "_blank");
        }}/>
    }
});

const mentionPlugin = createMentionPlugin({
    mentions: sampleData.mentions,
    entityMutability: 'IMMUTABLE',
    // theme: mentionsStyles,
    positionSuggestions,
    mentionPrefix: '@',
    mentionComponent: (mentionProps) => {
        const {mention} = mentionProps;
        return <Span
            className={mentionProps.className}
            // eslint-disable-next-line no-alert
            onClick={() => alert('Clicked on the Mention!' + mention.link)}
        >
          {mentionProps.children}
        </Span>
    },
});

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const {AlignmentTool} = alignmentPlugin;
const decorator = composeDecorators(
    resizeablePlugin.decorator,
    alignmentPlugin.decorator,
    focusPlugin.decorator,
    // blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({decorator});
const undoPlugin = createUndoPlugin();
const {UndoButton, RedoButton} = undoPlugin;
const videoPlugin = createVideoPlugin(decorator);
const {types} = videoPlugin;
const linkPlugin = createLinkPlugin({
    placeholder: 'http://…'
});
const emojiPlugin = createEmojiPlugin();
const {EmojiSuggestions, EmojiSelect} = emojiPlugin;


class AddVideoButton extends React.Component {
    onClick = () =>
        // A button can call `onOverrideContent` to replace the content
        // of the toolbar. This can be useful for displaying sub
        // menus or requesting additional information from the user.
        this.props.onOverrideContent(HeadlinesPicker);

    render() {
        return (
            <View className={"headlineButtonWrapper"}>
                <Button onClick={this.onClick} className={"headlineButton"}>
                    Hh
                </Button>
            </View>
        );
    }
}

class FontSizeButton extends React.Component {
    // onClick = () =>
    //     // A button can call `onOverrideContent` to replace the content
    //     // of the toolbar. This can be useful for displaying sub
    //     // menus or requesting additional information from the user.
    //     this.props.onOverrideContent(HeadlinesPicker);

    toggleFontSize = fontSize => {
        const newEditorState = styles.fontSize.toggle(this.state.editorState, fontSize);

        return this.onChange(newEditorState);
    };

    render() {
        const options = x => x.map(fontSize => {
            return <Option key={fontSize} value={fontSize}>{fontSize}</Option>;
        });
        return (
            <View>
                <Select display={"inline"} onChange={e => this.toggleFontSize(e.target.value)}>
                    {options(['12px', '24px', '36px', '50px', '72px'])}
                </Select>
            </View>
        );
    }
}

class AddEmojiButton extends React.Component {
    render() {
        return (
            <Span>
                <EmojiSuggestions/>
                <EmojiSelect/>
            </Span>
        );
    }
}

class CustomOption extends React.Component {
    static propTypes = {
        onChange: PropTypes.func,
        editorState: PropTypes.object,
    };

    toggleBold = () => {
        const {editorState, onChange} = this.props;
        const newState = RichUtils.toggleInlineStyle(
            editorState,
            'BOLD',
        );
        if (newState) {
            onChange(newState);
        }
    };

    render() {
        return (
            <Button className="rdw-storybook-custom-option" onClick={this.toggleBold}>B</Button>
        );
    }
}


const structure = [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    Separator,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
    linkPlugin.LinkButton,
    AddVideoButton,
    CustomOption,
    FontSizeButton
];
if (config.draft.undo) {
    structure.push(UndoButton);
    structure.push(RedoButton);
}
if (config.draft.emoji) {
    structure.push(AddEmojiButton);
}
const staticToolbarPlugin = createToolbarPlugin({
    structure: structure
});
const {Toolbar} = staticToolbarPlugin;
const plugins = [
    staticToolbarPlugin,
    blockDndPlugin,
    linkPlugin
];
if (config.draft.hashtag) {
    plugins.push(hashtagPlugin);
}
if (config.draft.linkify) {
    plugins.push(linkifyPlugin);
}
let MentionSuggestions;
if (config.draft.mention) {
    plugins.push(mentionPlugin);
    MentionSuggestions = mentionPlugin.MentionSuggestions;
}
if (config.draft.focus) {
    plugins.push(focusPlugin);
}
if (config.draft.alignment) {
    plugins.push(alignmentPlugin);
}
if (config.draft.resizeable) {
    plugins.push(resizeablePlugin);
}
if (config.draft.image) {
    plugins.push(imagePlugin);
}
if (config.draft.undo) {
    plugins.push(undoPlugin);
}
if (config.draft.video) {
    plugins.push(videoPlugin);
}
if (config.draft.emoji) {
    plugins.push(emojiPlugin);
}

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

        /* eslint-disable */
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems, {});
        });
        /* eslint-enable */
    }

    componentDidUpdate() {
    }

    @autobind
    onChange(editorState) {
        let state = editorState;
        this.setState({
            editorState: state
        });
    }

    @autobind
    focus() {
        this.editor.focus();
    };

    @autobind
    onSearchChange({value}) {
        this.setState({
            suggestions: defaultSuggestionsFilter(value, sampleData.mentions),
        });
    };

    @autobind
    onAddMention() {
        // get the mention object selected
    };

    toggleFontSize = fontSize => {
        const newEditorState = styles.fontSize.toggle(this.state.editorState, fontSize);

        return this.onChange(newEditorState);
    };

    removeFontSize = () => {
        const newEditorState = styles.fontSize.remove(this.state.editorState);

        return this.onChange(newEditorState);
    };

    addFontSize = val => () => {
        const newEditorState = styles.fontSize.add(this.state.editorState, val);

        return this.onChange(newEditorState);
    };

    toggleColor = color => {
        const newEditorState = styles.color.toggle(this.state.editorState, color);

        return this.onChange(newEditorState);
    };

    toggleTextTransform = color => {
        const newEditorState = styles.textTransform.toggle(this.state.editorState, color);

        return this.onChange(newEditorState);
    };

    _onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }

    render() {

        const {editorState, suggestions} = this.state;
        const inlineStyles = exporter(this.state.editorState);
        const html = stateToHTML(editorState.getCurrentContent(), {inlineStyles});
        const options = x => x.map(fontSize => {
            return <Option key={fontSize} value={fontSize}>{fontSize}</Option>;
        });

        return (
            <View>
                <View display="flex" flexFlow={"Row"}>
                    <button onClick={this._onBoldClick.bind(this)}>Bold</button>
                    <Button
                        onClick={this.removeFontSize}
                    >
                        Remove FontSize
                    </Button>
                    <Button
                        onClick={this.addFontSize('24px')}
                    >
                        Add FontSize
                    </Button>
                    <CustomOption/>
                    <Select display={"inline"} onChange={e => this.toggleFontSize(e.target.value)}>
                        {options(['12px', '24px', '36px', '50px', '72px'])}
                    </Select>
                    <Select display={"inline"} onChange={e => this.toggleColor(e.target.value)}>
                        {options(['green', 'blue', 'red', 'purple', 'orange'])}
                    </Select>
                    <Select display={"inline"} onChange={e => this.toggleTextTransform(e.target.value)}>
                        {options(['uppercase', 'capitalize'])}
                    </Select>
                </View>
                <View className={"editor"} display={"flex"} flexDirection={"column-reverse"}
                      onClick={this.focus}>
                    <Editor
                        customStyleFn={customStyleFn}
                        customStyleMap={customStyleMap}
                        editorState={editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={element => this.editor = element}
                    />
                    {
                        config.draft.mention &&
                        <MentionSuggestions
                            onSearchChange={this.onSearchChange}
                            suggestions={suggestions}
                            onAddMention={this.onAddMention}
                            entryComponent={Entry}
                        />
                    }
                    {
                        config.draft.alignment &&
                        <AlignmentTool/>
                    }
                    <Toolbar/>

                </View>
                <View style={{flex: '1 0 25%'}}>
                    <Text>Exported To HTML</Text>
                    <pre>{html}</pre>
                </View>
                <View style={{flex: '1 0 25%'}}>
                    <Text>ContentState</Text>
                    <View>
                        <Pre>
                          {JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}
                        </Pre>
                    </View>
                </View>
            </View>
        );
    }
}
