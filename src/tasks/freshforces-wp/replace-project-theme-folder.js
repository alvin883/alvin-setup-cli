const cp = require("child_process");

const replaceProjectThemeFolder = async (dirPath, projectName) => {
  cp.execSync(`rename project-theme ${projectName}`, {
    stdio: "inherit",
    cwd: `./${dirPath}/wp-content/themes/`,
  });

  return Promise.resolve();
};

module.exports = replaceProjectThemeFolder;
