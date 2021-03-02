const chalk = require("chalk");

module.exports = {
  done: chalk.green.bold("DONE"),
  process: chalk.yellow.bold("PROCESSING"),
  error: chalk.red.bold("ERROR"),
};
