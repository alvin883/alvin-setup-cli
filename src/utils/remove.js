const cp = require("child_process");
const logStyle = require("../logStyle");

const remove = async (source) => {
  try {
    cp.execSync(`RD /S /Q ${source}`);
    console.log(`%s Successfully remove ${source}`, logStyle.done);
    return Promise.resolve();
  } catch (err) {
    console.log(`%s Error while removing ${source}`, logStyle.error);
    Promise.reject();
    process.exit(1);
  }
};

module.exports = remove;
