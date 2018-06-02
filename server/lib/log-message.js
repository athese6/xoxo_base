const chalk = require('chalk');
// const emoji = require('node-emoji');

const info = (title, text = "", type = 'INFO : ') => `${chalk.cyan(type)}  ${chalk.cyan(title)}  ${text}`;
const danger = (title, text = "", type = 'DANGER : ') => `${chalk.yellow(type)}  ${chalk.yellow(title)}  ${text}`;
const error = (title, text = "", type = 'ERROR : ') => `${chalk.red(type)}  ${chalk.red(title)}  ${text}`;
const success = (title, text = "", type = 'SUCCESS : ') => `${chalk.green(type)}  ${chalk.green(title)}  ${text}`;

module.exports = {
    info,
    danger,
    error,
    success
};
