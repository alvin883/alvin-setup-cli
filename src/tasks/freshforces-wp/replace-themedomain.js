const rif = require("replace-in-files");
const logStyle = require("../../logStyle");

const replaceThemedomain = async (dirPath, newString) => {
  const {
    changedFiles,
    countOfMatchesByPaths,
    replaceInFilesOptions,
  } = await rif({
    files: `${dirPath}/wp-content/themes/project-theme/**/*.php`,
    optionsForFiles: {
      ignore: ["**/node_modules/**"],
    },
    encoding: "utf8",
    from: /themedomain/g,
    to: newString,
  });

  console.log("%s themedomain successfully changed!", logStyle.done);

  return Promise.resolve({
    changedFiles,
    countOfMatchesByPaths,
    replaceInFilesOptions,
  });
};

module.exports = replaceThemedomain;
