const path = require("path");
const { get } = require("https");
const fs = require("fs");
const copy = require("../../utils/copy");
const logStyle = require("../../logStyle");

/**
 * @returns {String} secret key block
 */
const getSecretKey = () => {
  return new Promise((resolve, reject) => {
    console.log("%s Getting new secret key ...", logStyle.process);
    get("https://api.wordpress.org/secret-key/1.1/salt/", function (res) {
      res.setEncoding("utf-8");
      res.on("data", function (data) {
        console.log("%s Secret key successfully generated", logStyle.done);
        return resolve(data);
      });
    });
  });
};

const replaceConfig = async (databaseName = "dbname") => {
  const filePath = path.join(process.cwd(), "wp-config.php");
  const newSecretKey = await getSecretKey();

  fs.readFile(filePath, "utf-8", function (err, data) {
    if (err) throw err;

    let newData = data;

    newData = newData.replace(/database_name_here/gim, databaseName);
    newData = newData.replace(/username_here/gim, "root");
    newData = newData.replace(/password_here/gim, "");

    /**
     * This will match everything that start with `define('AUTH_KEY'` until it
     * has a newline and followed by a collection of strange symbol.
     * this symbol: /**#@-*(end with slash)
     */
    const regexDefineBlock = new RegExp(
      /define\( \'AUTH_KEY\'.*(?=(\n\/\*\*\#\@\-\*\/))/s,
    );

    newData = newData.replace(regexDefineBlock, newSecretKey);

    fs.writeFile(filePath, newData, "utf-8", function (err) {
      if (err) throw err;
      console.log("%s WP Config updated successfully!", logStyle.done);
    });
  });
};

const createWPConfig = async (projectName) => {
  await copy(
    path.join(process.cwd(), "wp-config-sample.php"),
    path.join(process.cwd(), "wp-config.php"),
  );

  replaceConfig(projectName);
};

module.exports = createWPConfig;
