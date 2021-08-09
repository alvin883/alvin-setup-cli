import inquirer from "inquirer";

/**
 * @returns {{ folderName: string }}
 */
export const prompt = async () => {
  const folderName = [
    {
      type: "input",
      name: "folderName",
      message: "Please type the folder name for this project?",
      default: "my-create-react-app",
    },
  ];

  return { ...(await inquirer.prompt(folderName)) };
};
