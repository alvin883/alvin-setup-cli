const remove = require("../../utils/remove");

const removeGitProjectStarter = async (tempFolder) => {
  remove(`.git`);
};

module.exports = removeGitProjectStarter;
