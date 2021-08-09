import chalk from "chalk";

/**
 * @deprecated
 */
export const logStyle = {
  done: chalk.green.bold("DONE"),
  process: chalk.yellow.bold("PROCESSING"),
  error: chalk.red.bold("ERROR"),
};

export const log = {
  /**
   * @param {string} message
   */
  done: (message) => {
    console.log(`%s ${message}`, chalk.green.bold("DONE"));
  },

  /**
   * @param {string} message
   */
  process: (message) => {
    console.log(`%s ${message}`, chalk.yellow.bold("PROCESSING"));
  },

  /**
   * @param {string} message
   */
  error: (message) => {
    console.log(`%s ${message}`, chalk.red.bold("ERROR"));
  },
};
