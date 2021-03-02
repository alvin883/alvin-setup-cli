const ncp = require("ncp").ncp;
const { promisify } = require("util");
const copy = promisify(ncp);

const ncpOptions = {
  // Overwrite files that already exist in destination  folder
  clobber: true,
};

const { done: styleDone, error: styleError } = require("./logStyle");

/**
 * Copy the template folder
 *
 * @param {string} source The source of a template folder
 * @param {string} destination The destination folder for template
 * @param {Function} callback will be called after finished copying successfully
 */
const copyTemplate = async function (source, destination, callback = () => {}) {
  copy(source, destination, ncpOptions, (err) => {
    if (err) {
      console.error("%s Error copying the folder", styleError);
      process.exit(1);
    }

    console.log("%s Template folder has been copied succesfully!", styleDone);
    callback();
    return Promise.resolve(true);
  });
};

module.exports = copyTemplate;
