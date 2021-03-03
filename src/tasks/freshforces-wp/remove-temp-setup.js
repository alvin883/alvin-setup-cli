const path = require("path");
const remove = require("../../utils/remove");
const logStyle = require("../../logStyle");

const removeTempSetup = async (tempFolder) => {
  try {
    await remove(path.join(process.cwd(), tempFolder));
    console.log(`%s Successfully remove ${tempFolder}`, logStyle.done);
    return Promise.resolve();
  } catch (err) {
    Promise.reject();
  }
};

module.exports = removeTempSetup;
