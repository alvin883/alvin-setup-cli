const path = require("path");
const fs = require("fs");
const logStyle = require("../../logStyle");

const replaceGulpHost = async (projectName) => {
  try {
    const filePath = path.join(
      process.cwd(),
      "/wp-content/themes/",
      projectName,
      "gulpfile.options.js",
    );

    let newData = fs.readFileSync(filePath, { encoding: "utf-8" });
    newData = newData.replace(/projectname/g, projectName);

    fs.writeFileSync(filePath, newData, { encoding: "utf-8" });
    console.log("%s Gulp host updated successfully!", logStyle.done);
    return Promise.resolve();
  } catch (err) {
    console.log("%s Error while replacing gulp host", logStyle.error);
    Promise.reject();
  }
};

module.exports = replaceGulpHost;
