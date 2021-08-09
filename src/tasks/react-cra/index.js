import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";
import { copy } from "fs-extra";
import { goAsync, log } from "../../utils";
import { prompt } from "./prompt";
import { replaceCommand } from "./replace-command";

const runCreateReactApp = async () => {
  const options = await prompt();

  /**
   * Why not using await? apparently at the moment I don't know how to stream
   * stdio into the console with await yet
   */
  try {
    execSync(`npx create-react-app ${options.folderName}`, {
      stdio: "inherit",
    });
  } catch (e) {
    log.error("Can't run npx create-react-app");
    return Promise.reject();
  }

  log.done("Finish installing Create React App!");
  log.process("Wait there's more ...");

  try {
    execSync("npm install -D sass @craco/craco", {
      stdio: "inherit",
      cwd: `./${options.folderName}`,
    });
  } catch (e) {
    log.error("Can't run npm install");
    return Promise.reject();
  }

  log.done("Finish installing Craco and SASS");
  log.process("Copying setup template ...");

  const copySource = path.join(__dirname, "../../templates/react-cra");
  const copyDest = path.join(process.cwd(), options.folderName);
  const [, copyError] = await goAsync(
    copy(copySource, copyDest, { overwrite: true }),
  );

  if (copyError) {
    log.error("Can't copy the template folder");
    return Promise.reject();
  }

  log.done("Template copied successfully");

  const [, replaceError] = await goAsync(replaceCommand(options.folderName));

  if (replaceError) {
    log.error("Can't replace react-scripts command into craco command");
    return Promise.reject();
  }

  log.done("Changed react-scripts command to craco");

  console.log("\n");
  log.done("Everything is ready to go");
  console.log("     Start the development by running:");
  console.log("");
  console.log(`     %s ${options.folderName}`, chalk.blueBright("cd"));
  console.log(`     %s`, chalk.blueBright("yarn start"));
  console.log("\n");

  return Promise.resolve(true);
};

module.exports = runCreateReactApp;
