const remove = require("../../utils/remove");

const removeGitProjectStarter = async (tempFolder) => {
  remove(`${tempFolder}\\.git`);
};

module.exports = removeGitProjectStarter;
