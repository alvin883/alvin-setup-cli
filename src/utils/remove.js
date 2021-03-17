const cp = require("child_process");
const logStyle = require("../logStyle");

const remove = async (source) => {
  let errorCount = 0;
  try {
    cp.execSync(`RD /S /Q ${source}`);
    console.log(`%s Successfully remove ${source}`, logStyle.done);
    return Promise.resolve();
  } catch (err) {
    errorCount = errorCount + 1;
    console.log(`%s Error while removing ${source}`, logStyle.error);

    // Keep trying if it hasn't failed for more than 3
    if (errorCount < 3) {
      await remove(source);
    } else {
      Promise.reject();
      process.exit(1);
    }
  }
};

module.exports = remove;
