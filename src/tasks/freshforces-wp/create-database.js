const cp = require("child_process");
const logStyle = require("../../logStyle");
const inquirer = require("inquirer");

const createDatabase = async (databaseName) => {
  try {
    cp.execSync(`mysql -u root -e "CREATE DATABASE \`${databaseName}\`"`, {
      cwd: "C:\\laragon\\bin\\mysql\\mysql-5.7.24-winx64\\bin",
    });
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
      createDatabase(questionsPrompt.database_name);
    } else {
      console.log("%s Error while creating database", logStyle.error);
      Promise.reject();
    }
  }
};

module.exports = createDatabase;
