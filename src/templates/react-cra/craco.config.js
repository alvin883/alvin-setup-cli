const path = require("path");
const jsconfig = require("./jsconfig.json");

/**
 * @param {{[key: string]: string[]}} paths
 * @param {(targetPath: string) => string} mapper
 */
const aliases = (paths = {}, mapper = (targetPath) => targetPath) => {
  let aliases = {};
  Object.keys(paths).forEach((key) => {
    const _key = key.replace("/*", "");
    const _val = paths[key][0].replace("/*", "");
    aliases[_key] = mapper(_val);
  });
  return aliases;
};

module.exports = {
  webpack: {
    alias: aliases(jsconfig?.compilerOptions?.paths, (targetPath) =>
      path.resolve(__dirname, targetPath),
    ),
  },
};
