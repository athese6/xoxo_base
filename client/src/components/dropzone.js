import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import {connect} from "react-redux";
import {View, Input, Button, Label} from './base';
import DropzoneComponent from 'react-dropzone-component';
import Utils from '../../lib/utils';

@connect(store => ({
    lang: store.i18n.translations,
}))

export default class Dropzone extends React.Component {
    self;
    dropzone = undefined;
    componentConfig = {
        iconFiletypes: ['.jpg', '.png', '.gif'],
        showFiletypeIcon: false,
        postUrl: '/api/dropzone/upload'
        // postUrl: 'no-url'
    };

    componentDidMount() {
        this.self = this;
    }

    @autobind
    handleFileAdded(file) {
        console.log(file);
        console.log("addedFile : " + file.name);
        this.dropzone && this.dropzone.files.length > 1 && this.dropzone.removeFile(this.dropzone.files[0]);
    }

    @autobind
    handleFileRemoved(file) {
        console.log("removedFile : " + file.name);
    }

    @autobind
    handlePost() {
        this.dropzone && this.dropzone.processQueue();
    }

    @autobind
    handleRemove() {
        this.dropzone && this.dropzone.files.length > 0 && this.dropzone.removeFile(this.dropzone.files[0]);
    }

    @autobind
    uploadprogress(file, progress, bytesSent) {
        // Display the progress
        console.log("file:" + file.name + " , prgress:" + progress + " ,bytesSent:" + bytesSent);
    }

    @autobind
    sending(file, xhr, formData) {
        console.log(file);
        console.log(xhr);
        console.log(formData);
        if (this.self.props.filename) {
            file.upload.filename = this.self.props.filename;
            formData.append("filesize", file.size);
            formData.append("ext", Utils.getExtension(file.name));
            formData.append("newFilename", this.self.props.filename);
        }

    }

    //
    // @autobind
    // renameFile(file) {
    //     console.log("renameFile1 : " + file.name);
    //     file.name = new Date().getTime() + '_' + file.name;
    //     file.upload.filename = file.name;
    //     console.log("renameFile2 : " + file.name);
    //     return file;
    // }
    //
    // @autobind
    // renameFilename(filename) {
    //     console.log("renameFile1 : " + filename);
    //     filename = new Date().getTime() + '_' + filename;
    //     console.log("renameFile2 : " + filename);
    //     return filename;
    // }

    render() {
        const {lang, filename} = this.props;
        const djsConfig = {
            maxFiles: 1,
            maxFilesize: 2,
            addRemoveLinks: false,
            acceptedFiles: "image/jpeg,image/png,image/gif",
            autoProcessQueue: false,
            params: {
                myParameter: "I'm a parameter!"
            },
            dictDefaultMessage: lang["dictDefaultMessage"],
            dictFallbackMessage: lang["dictFallbackMessage"],
            dictFallbackText: lang["dictFallbackText"],
            dictFileTooBig: lang["dictFileTooBig"],
            dictInvalidFileType: lang["dictInvalidFileType"],
            dictResponseError: lang["dictResponseError"],
            dictCancelUpload: lang["dictCancelUpload"],
            dictCancelUploadConfirmation: lang["dictCancelUploadConfirmation"],
            dictRemoveFile: lang["dictRemoveFile"],
            dictMaxFilesExceeded: lang["dictMaxFilesExceeded"]
        };
        const eventhadlers = {
            init: dz => this.dropzone = dz,
            addedfile: this.handleFileAdded,
            removedfile: this.handleFileRemoved,
            uploadprogress: this.uploadprogress,
            sending: this.sending
        };
        return (
            <View display="flex" flexFlow="Column">
                <DropzoneComponent config={this.componentConfig}
                                   eventHandlers={eventhadlers}
                                   djsConfig={djsConfig}/>
                <View display="flex" flexFlow="Row">
                    <Button onClick={this.handlePost.bind(this)}>Upload</Button>
                    <Button onClick={this.handleRemove.bind(this)}>Remove</Button>
                </View>
            </View>

        );
    }
}

Dropzone.propTypes = {
    filename: PropTypes.string,
};

Dropzone.defaultProps = {
    filename: "111tteafsf.jpg",
};

