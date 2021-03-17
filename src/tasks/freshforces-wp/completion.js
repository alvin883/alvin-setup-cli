const chalk = require("chalk");
const logStyle = require("../../logStyle");

const completion = async (projectName) => {
  console.log("\n");
  console.log("%s 🎉🎉🎉 Everything is ready :)\n", logStyle.done);
  console.log("You can run the following command:\n ");
  console.log(
    `    ${chalk.cyanBright("cd")} ./wp-content/themes/${projectName}`,
  );
  console.log(`    ${chalk.cyanBright("npm start")}`);
  console.log("\n");
};

module.exports = completion;
