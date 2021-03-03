const cp = require("child_process");
const logStyle = require("../../logStyle");

const replaceProjectThemeFolder = async (dirPath, projectName) => {
  try {
    cp.execSync(`rename project-theme ${projectName}`, {
      stdio: "inherit",
      cwd: `./wp-content/themes/`,
    });

    console.log(
      "%s Successfully changed project-theme folder name",
      logStyle.done,
    );

    return Promise.resolve();
  } catch (err) {
    Promise.reject(err);
  }
};

module.exports = replaceProjectThemeFolder;
