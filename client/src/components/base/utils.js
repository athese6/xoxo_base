import {isBrowser} from 'browser-or-node';

/**
 * @returns {isBrowser|Navigator|boolean}
 */

const isReactNative = () => isBrowser && window.navigator && window.navigator.product === "ReactNative";
const utils = {
    isReactNative: isReactNative,
    onlyReact: (props) => isReactNative() ? {} : props,
    onlyReactNative: (props) => isReactNative() ? props : {},
};

export default utils;

