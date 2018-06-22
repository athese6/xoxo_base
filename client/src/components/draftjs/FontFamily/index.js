/* @flow */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    toggleCustomInlineStyle,
    getSelectionCustomInlineStyle,
} from 'draftjs-utils';

import LayoutComponent from './Component';

export default class FontFamily extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        editorState: PropTypes.object,
        modalHandler: PropTypes.func,
        config: PropTypes.object,
        translations: PropTypes.object,
    };

    state = {
        expanded: undefined,
        currentFontFamily: undefined,
    };

    componentWillMount() {
        let {editorState, modalHandler} = this.props;
        if (editorState) {
            this.setState({
                currentFontFamily: getSelectionCustomInlineStyle(editorState, ['FONTFAMILY']).FONTFAMILY,
            });
        }
        modalHandler = this.expandCollapse;
    }

    componentWillReceiveProps(properties) {
        if (properties.editorState &&
            this.props.editorState !== properties.editorState) {
            this.setState({
                currentFontFamily:
                getSelectionCustomInlineStyle(properties.editorState, ['FONTFAMILY']).FONTFAMILY,
            });
        }
    }

    componentWillUnmount() {
        let {modalHandler} = this.props;
        modalHandler = undefined;//.deregisterCallBack(this.expandCollapse);
    }

    onExpandEven = () => {
        this.signalExpanded = !this.state.expanded;
    };

    expandCollapse = () => {
        this.setState({
            expanded: this.signalExpanded,
        });
        this.signalExpanded = false;
    };

    doExpand = () => {
        this.setState({
            expanded: true,
        });
    };

    doCollapse = () => {
        this.setState({
            expanded: false,
        });
    };

    toggleFontFamily = (fontFamily) => {
        const {editorState, onChange} = this.props;
        const newState = toggleCustomInlineStyle(
            editorState,
            'fontFamily',
            fontFamily,
        );
        if (newState) {
            onChange(newState);
        }
    };

    render() {
        const {config, translations} = this.props;
        const {expanded, currentFontFamily} = this.state;
        // const FontFamilyComponent = config.component || LayoutComponent;
        const FontFamilyComponent = LayoutComponent;
        const fontFamily = currentFontFamily && currentFontFamily.substring(11);
        return (
            <FontFamilyComponent
                translations={translations}
                config={config}
                currentState={{fontFamily}}
                onChange={this.toggleFontFamily}
                expanded={expanded}
                onExpandEvent={this.onExpandEvent}
                doExpand={this.doExpand}
                doCollapse={this.doCollapse}
            />
        );
    }
}
