const cp = require("child_process");
const inquirer = require("inquirer");

const setupNextjs = async () => {
  const questionsPrompt = await inquirer.prompt([
    {
      type: "input",
      name: "folder_name",
      message: "What's the project name?",
      default: "nextjs-project",
    },
  ]);

  cp.execSync(`mkdir ${questionsPrompt.folder_name}`);
  cp.execSync(`git clone https://github.com/alvin883/nextjs-setup.git .`, {
    stdio: "inherit",
    cwd: questionsPrompt.folder_name,
  });
};

module.exports = setupNextjs;
