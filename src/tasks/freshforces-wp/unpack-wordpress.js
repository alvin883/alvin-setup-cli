const extract = require("extract-zip");
const logStyle = require("../../logStyle");
const path = require("path");
const getUserCachePath = require("../../utils/get-user-cache-path");

const unpackWordpress = async (tempWordpressFolder) => {
  try {
    const file = path.join(getUserCachePath(), "wordpress.zip");
    console.log("%s Unpacking WordPress ...", logStyle.process);
    await extract(file, { dir: path.join(process.cwd(), tempWordpressFolder) });
    console.log("%s WordPress extraction complete!", logStyle.done);
    return Promise.resolve();
  } catch (err) {
    console.log("%s WordPress extraction failed!", logStyle.error);
    Promise.reject(err);
  }
};

module.exports = unpackWordpress;
