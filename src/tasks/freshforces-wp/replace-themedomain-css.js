const path = require("path");
const fs = require("fs");
const logStyle = require("../../logStyle");

const replaceThemedomainCss = async (projectName) => {
  try {
    const filePath = path.join(
      process.cwd(),
      "/wp-content/themes/",
      projectName,
      "style.css",
    );

    let newData = fs.readFileSync(filePath, { encoding: "utf-8" });
    newData = newData.replace(/themedomain/g, projectName);

    fs.writeFileSync(filePath, newData, { encoding: "utf-8" });
    console.log(
      "%s themedomain inside style.css updated successfully!",
      logStyle.done,
    );
    return Promise.resolve();
  } catch (err) {
    console.log(
      "%s Error while replacing themedomain inside style.css",
      logStyle.error,
    );
    Promise.reject();
  }
};

module.exports = replaceThemedomainCss;
