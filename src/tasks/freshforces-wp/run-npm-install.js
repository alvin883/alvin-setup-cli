const cp = require("child_process");
const logStyle = require("../../logStyle");

const runNpmInstall = async (projectName) => {
  try {
    console.log("%s Starting to perform npm install ...", logStyle.process);
    cp.execSync(`npm install`, {
      stdio: "inherit",
      cwd: `./wp-content/themes/${projectName}`,
    });
    return Promise.resolve();
  } catch (err) {
    console.log("%s Error while running npm install", logStyle.error);
    return Promise.reject();
  }
};

module.exports = runNpmInstall;
