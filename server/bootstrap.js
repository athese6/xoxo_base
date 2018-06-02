require('ignore-styles');
require('url-loader');
require('file-loader');
require('babel-register')({
    ignore: [/(node_modules)/],
    presets: ['es2015', 'stage-1', 'react-app'],
    plugins: [
        'transform-decorators-legacy',
        'syntax-dynamic-import',
        'dynamic-import-node',
        'react-loadable/babel'
    ]
});
require('./index');
