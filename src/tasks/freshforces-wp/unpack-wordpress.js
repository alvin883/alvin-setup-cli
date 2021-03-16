const extract = require("extract-zip");
const logStyle = require("../../logStyle");

const unpackWordpress = async () => {
  try {
    const file = "wordpress.zip";
    console.log("%s Unpacking WordPress ...", logStyle.process);
    await extract(file, { dir: process.cwd() });
    console.log("%s WordPress extraction complete!", logStyle.done);
    return Promise.resolve();
  } catch (err) {
    console.log("%s WordPress extraction failed!", logStyle.error);
    Promise.reject(err);
  }
};

module.exports = unpackWordpress;
