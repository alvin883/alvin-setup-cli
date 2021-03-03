const ncp = require("ncp").ncp;
const { promisify } = require("util");
const _copy = promisify(ncp);
const logStyle = require("../logStyle");

const ncpOptions = {
  // Overwrite files that already exist in destination  folder
  clobber: true,
};

async function copy(source, destination) {
  try {
    await _copy(source, destination, ncpOptions);
    console.log(
      `%s Successfully copied ${source} to ${destination}`,
      logStyle.done,
    );
    return Promise.resolve();
  } catch (err) {
    console.log(`%s Error copying ${source} to ${destination}`, logStyle.error);
    Promise.reject();
    process.exit(1);
  }
}

module.exports = copy;
