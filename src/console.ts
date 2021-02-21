import chalk = require("chalk");
const log = console.log;
const warn = console.warn;
const error = console.error;
const info = console.info;
global.console.log = function (...args) {
  log(chalk.white(...args));
};
global.console.warn = function (...args) {
  warn(chalk.yellow(...args));
};
global.console.error = function (...args) {
  error(chalk.red(...args));
};
global.console.info = function (...args) {
  info(chalk.blue(...args));
};

export default global.console