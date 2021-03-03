const cp = require("child_process");
const logStyle = require("../../logStyle");

const cloneProjectStarter = async (dirPath, tempFolder) => {
  try {
    cp.execSync(
      `git clone https://github.com/freshforces-borndigital/project-starter.git ${tempFolder}`,
      { stdio: "inherit" },
    );
    console.log("%s Successfully cloned git project-starter", logStyle.done);
  } catch (err) {
    console.error(err);
  }

  return Promise.resolve();
};

module.exports = cloneProjectStarter;
