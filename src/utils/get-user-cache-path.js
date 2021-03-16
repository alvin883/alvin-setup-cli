const path = require("path");

/**
 * @returns {String} Node path ex. C:/Users/alvin/AppData/alvin-setup-cli/
 * @see https://stackoverflow.com/a/26227660/6049731
 */
const getUserCachePath = () => {
  const userPath =
    process.env.APPDATA ||
    (process.platform == "darwin"
      ? process.env.HOME + "/Library/Preferences"
      : process.env.HOME + "/.local/share");
  const userCachePath = path.join(userPath, "alvin-setup-cli");
  return userCachePath;
};

module.exports = getUserCachePath;
