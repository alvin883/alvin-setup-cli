const fs = require("fs");
const logStyle = require("../../logStyle");
const path = require("path");
const getUserCachePath = require("../../utils/get-user-cache-path");

/**
 * Check whether WordPress is cached or not.
 * @returns {Boolean}
 */
const checkWordpressCache = async () => {
  const wordpressCachePath = path.join(getUserCachePath(), "wordpress.zip");

  try {
    return Promise.resolve(fs.statSync(wordpressCachePath).isFile());
  } catch (err) {
    if (err.code === "ENOENT") {
      return Promise.resolve(false);
    } else {
      console.log("%s Error while checking cache existence", logStyle.error);
      return Promise.resolve(false);
    }
  }
};

module.exports = checkWordpressCache;
