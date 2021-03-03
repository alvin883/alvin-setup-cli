const path = require("path");
const copy = require("../../utils/copy");
const remove = require("../../utils/remove");

const moveFilesToRoot = async (tempFolder) => {
  try {
    await copy(path.join(process.cwd(), tempFolder), process.cwd());
    await remove(path.join(process.cwd(), tempFolder));
    return Promise.resolve();
  } catch (err) {
    Promise.reject();
  }
};

module.exports = moveFilesToRoot;
