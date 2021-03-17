const path = require("path");
const logStyle = require("../../logStyle");
const remove = require("../../utils/remove");

const removeGitProjectStarter = async (tempFolder) => {
  return new Promise((resolve, reject) => {
    remove(path.join(tempFolder, ".git"));
    console.log(
      "%s The git inside tempFolder successfully removed",
      logStyle.done,
    );
    return resolve();
  });
};

module.exports = removeGitProjectStarter;
