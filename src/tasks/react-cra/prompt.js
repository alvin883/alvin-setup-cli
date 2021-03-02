const inquirer = require("inquirer");

const prompt = async () => {
  const folderName = [
    {
      type: "input",
      name: "folderName",
      message: "Please type the folder name for this project?",
      default: "my-create-react-app",
    },
  ];

  return {...await inquirer.prompt(folderName)}
};

module.exports = prompt;
