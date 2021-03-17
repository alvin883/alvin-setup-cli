const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const inquirer = require("inquirer");
const logStyle = require("../../logStyle");
const getUserCachePath = require("../../utils/get-user-cache-path");

const checkMysqlSetting = () => {
  const settingPath = path.join(getUserCachePath(), "settings.json");

  try {
    return Promise.resolve(fs.statSync(settingPath).isFile());
  } catch (err) {
    if (err.code === "ENOENT") {
      return Promise.resolve(false);
    } else {
      console.log("%s Error while checking cache existence", logStyle.error);
      console.log(err);
      return Promise.resolve(false);
    }
  }
};

const createDatabase = async (mysqlPath, databaseName) => {
  try {
    cp.execSync(`mysql -u root -e "CREATE DATABASE \`${databaseName}\`"`, {
      cwd: mysqlPath,
    });
    console.log("%s Database created!", logStyle.done);
    return Promise.resolve();
  } catch (err) {
    const isDatabaseExist =
      err &&
      err.message &&
      typeof err.message === "string" &&
      err.message.includes("database exists");

    if (isDatabaseExist) {
      console.log(
        "%s Error, database is already exist, please provide different name!",
        logStyle.error,
      );

      const questionsPrompt = await inquirer.prompt([
        {
          type: "input",
          name: "database_name",
          message: "What's the database name?",
        },
      ]);
      await createDatabase(questionsPrompt.database_name);
    } else {
      console.log("%s Error while creating database", logStyle.error);
      Promise.reject();
    }
  }
};

const prepareCreateDatabase = async (databaseName) => {
  let hasSetMysql = await checkMysqlSetting();
  const settingsPath = path.join(getUserCachePath(), "settings.json");

  if (hasSetMysql) {
    const mysqlPath = JSON.parse(
      fs.readFileSync(settingsPath, { encoding: "utf-8" }),
    ).mysql_path;
    createDatabase(mysqlPath, databaseName);
  } else {
    const questionsPrompt = await inquirer.prompt([
      {
        type: "input",
        name: "mysql_path",
        message: "Please, insert your MySQL bin path?",
        default: "C:\\laragon\\bin\\mysql\\mysql-5.7.24-winx64\\bin",
      },
    ]);

    const jsonData = JSON.stringify(
      { mysql_path: questionsPrompt.mysql_path },
      null,
      4,
    );

    try {
      fs.writeFileSync(settingsPath, jsonData);
    } catch (err) {
      console.log(
        "%s Error while creating settings.json file :(",
        logStyle.error,
      );
      Promise.reject();
      process.exit(1);
    }
  }
};

module.exports = prepareCreateDatabase;
