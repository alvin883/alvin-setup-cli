const cp = require("child_process");
const path = require("path");

const { done: styleDone, process: styleProcess } = require("./logStyle");
const prompt = require("./prompt");
const copyTemplate = require("./copyTemplate");
const replaceNpmCommand = require("./replaceNpmCommand");

const runCreateReactApp = async () => {
  const options = await prompt();

  cp.execSync(`npx create-react-app ${options.folderName}`, {
    stdio: "inherit",
  });

  console.log("%s Finish installing Create React App!", styleDone);
  console.log("%s Wait there's more ...", styleProcess);

  cp.execSync(`npm install -D sass @craco/craco`, {
    stdio: "inherit",
    cwd: `./${options.folderName}`,
  });

  console.log("%s Finish installing Craco and SASS", styleDone);
  console.log("%s Copying setup template ...", styleProcess);

  const copySource = path.join(__dirname, "template");
  const copyDest = path.join(process.cwd(), options.folderName);
  copyTemplate(copySource, copyDest, () => {
    console.log("%s Template copied successfully", styleDone);
    replaceNpmCommand(options.folderName);
  });
};

export const run = () => runCreateReactApp();
