import inquirer from "inquirer";
import { goAsync } from "./utils";

const questionsPrompt = async () => {
  const questions = [
    {
      type: "list",
      name: "setup_type",
      message: "Please choose what kind of tech stack do you want to setup?",
      choices: [
        {
          name: "React Standalone (with CRA)",
          value: "react-cra",
          short: "react-cra",
        },
        {
          name: "React Wordpress (without CRA)",
          value: "react-custom-wp",
          short: "react-custom-cra",
        },
        {
          name: "Nextjs",
          value: "nextjs",
          short: "nextjs",
        },

        // Office setup (Fresh Forces setup)
        // --------------------------------------------------------------------
        {
          name: "Freshforces - Wordpress Only",
          value: "freshforces-wp",
          short: "freshforces-wp",
        },
      ],
      default: "react-cra",
    },
  ];

  return { ...(await inquirer.prompt(questions)) };
};

const main = async () => {
  const options = await questionsPrompt();

  // Run task based on selected `setup_type`
  const task = require(`./tasks/${options.setup_type}/index.js`);
  const [, error] = await goAsync(task());
  if (error) process.exit(1);
};

export const run = () => main();
