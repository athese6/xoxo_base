'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err;
});

import express from 'express';
import Loadable from 'react-loadable';

import indexController from './controllers/index';

const PORT = 3000;


// Ensure environment variables are read.
require('../config/env');


// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

if (process.env.HOST) {
    console.log(
        chalk.cyan(
            `Attempting to bind to HOST environment variable: ${chalk.yellow(
                chalk.bold(process.env.HOST)
            )}`
        )
    );
    console.log(
        `If this was unintentional, check that you haven't mistakenly set it in your shell.`
    );
    console.log(`Learn more here: ${chalk.yellow('http://bit.ly/2mwWSwH')}`);
    console.log();
}
// initialize the application and create the routes
const app = express();

app.use(indexController);

// start the app
Loadable.preloadAll().then(() => {
    app.listen(PORT, (error) => {
        if (error) {
            return console.log('something bad happened', error);
        }

        console.log("listening on " + PORT + "...");
    });
});
