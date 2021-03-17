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
const createDatabase = require("./create-database");
const createWPConfig = require("./create-wp-config");

const questionsPrompt = async () => {
  const dirname = process.cwd().split(path.sep);
  const currentDirectory = dirname[dirname.length - 1];

  const questions = [
    {
      type: "input",
      name: "project_name",
      message:
        "What's the project name?\n  * Only alphanumeric, dash(-), underscore(_) are allowed\n  * will be used for theme-folder, DB name, wp-domain-name, local domain\n  name:",
      default: currentDirectory,
    },
  ];

  return { ...(await inquirer.prompt(questions)) };
};

const setupFreshforcesWp = async () => {
  const tempSetupFolder = "_temp_setup";
  const tempWordpressFolder = "_temp_wordpress";
  let options = await questionsPrompt();

  // Match alphanumeric, dash(-) and underscore(_)
  const stringTest = new RegExp(/^[a-zA-Z0-9_\-]*$/gm);
  const isValidProjectName = stringTest.test(options.project_name);
  if (!isValidProjectName) {
    console.log("%s project_name contain forbidden char :(", logStyle.error);
    options = await questionsPrompt();
  }

  await downloadWordpress();
  await unpackWordpress(tempWordpressFolder);
  await moveFilesToRoot(path.join(tempWordpressFolder, "wordpress"));

  await cloneProjectStarter(options.project_name, tempSetupFolder);
  await moveFilesToRoot(tempSetupFolder);
  await replaceThemedomain(options.project_name, options.project_name);
  await replaceProjectThemeFolder(options.project_name, options.project_name);
  await replaceThemedomainCss(options.project_name);
  await replaceGulpHost(options.project_name);
  await createDatabase(options.project_name);
  await createWPConfig(options.project_name);

  // Make sure other git processes ID outside task has been done properly and
  // can be removed safely
  setTimeout(async function () {
    await removeGitProjectStarter(tempSetupFolder);
    await removeTempSetup(tempSetupFolder);
    await removeTempSetup(tempWordpressFolder);
  }, 1000);
};

module.exports = setupFreshforcesWp;
