const path = require("path");
const copy = require("../../utils/copy");

const moveFilesToRoot = async (tempFolder) => {
  try {
    await copy(path.join(process.cwd(), tempFolder), process.cwd());
    return Promise.resolve();
  } catch (err) {
    Promise.reject();
  }
};

module.exports = moveFilesToRoot;
