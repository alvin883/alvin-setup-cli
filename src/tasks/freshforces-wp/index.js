const inquirer = require("inquirer");
const cp = require("child_process");
const path = require("path");
const logStyle = require("../../logStyle");
const replaceThemedomain = require("./replace-themedomain");
const cloneProjectStarter = require("./clone-project-starter");
const replaceProjectThemeFolder = require("./replace-project-theme-folder");
const moveFilesToRoot = require("./move-files-to-root");
const removeGitProjectStarter = require("./remove-git-project-starter");
const removeTempSetup = require("./remove-temp-setup");
const replaceThemedomainCss = require("./replace-themedomain-css");
const replaceGulpHost = require("./replace-gulp-host");
const { setTimeout } = require("timers");
const downloadWordpress = require("./download-wordpress");
const unpackWordpress = require("./unpack-wordpress");

const questionsPrompt = async () => {
  const dirname = process.cwd().split(path.sep);
  const currentDirectory = dirname[dirname.length - 1];

  const questions = [
    {
      type: "input",
      name: "project_name",
      message:
        "What's the project name? (used for theme-folder, DB name, wp-domain-name, domain local)",
      default: currentDirectory,
    },
  ];

  return { ...(await inquirer.prompt(questions)) };
};

const setupFreshforcesWp = async () => {
  const confirmation = await inquirer.prompt([
    {
      type: "confirm",
      name: "laragon_wp_installed",
      message:
        "Have you installed / run laragon WP quick app for this project?",
    },
  ]);
  if (!confirmation.laragon_wp_installed) {
    return console.log(
      "%s Sorry, for now this setup doesn't support to automatically setup database, you need to run laragon quick app for WordPress first, then start this setup",
      logStyle.error,
    );
  }

  const tempFolder = "_temp_setup";
  const options = await questionsPrompt();

  await downloadWordpress();
  await unpackWordpress();
  await moveFilesToRoot("wordpress");

  await cloneProjectStarter(options.project_name, tempFolder);
  await moveFilesToRoot(tempFolder);
  await replaceThemedomain(options.project_name, options.project_name);
  await replaceProjectThemeFolder(options.project_name, options.project_name);
  await replaceThemedomainCss(options.project_name);
  await replaceGulpHost(options.project_name);

  // Make sure other git processes ID outside task has been done properly and
  // can be removed safely
  setTimeout(async function () {
    await removeGitProjectStarter(tempFolder);
    await removeTempSetup(tempFolder);
    await removeTempSetup("wordpress");
  }, 1000);
};

module.exports = setupFreshforcesWp;
