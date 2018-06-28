import {isBrowser} from 'browser-or-node';

/**
 * @returns {isBrowser|Navigator|boolean}
 */
export const isReactNative = () => isBrowser && window.navigator && window.navigator.product === "ReactNative";
