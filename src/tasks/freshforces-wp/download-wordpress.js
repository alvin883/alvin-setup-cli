const { get } = require("https");
const fs = require("fs");
const logStyle = require("../../logStyle");
const cliProgress = require("cli-progress");
const path = require("path");
const getUserCachePath = require("../../utils/get-user-cache-path");
const checkWordpressCache = require("./check-wordpress-cache");
const inquirer = require("inquirer");

const doRealDownload = () => {
  const url = "https://wordpress.org/latest.zip";
  const dest = path.join(getUserCachePath(), "wordpress.zip");

  // Create the folder for storing the wordpress cache and user preferences
  // if it doesn't exist yet. This could be an error if you immediately
  // execute fs.createWriteStream() in non-existed path.
  if (!fs.existsSync(getUserCachePath())) {
    fs.mkdirSync(getUserCachePath());
  }

  const file = fs.createWriteStream(dest);
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.legacy);

  console.log("%s Start downloading WordPress ...", logStyle.process);
  return new Promise((resolve, reject) => {
    get(url, function (res) {
      const total = res.headers["content-length"];
      let current = 0;
      res.pipe(file);
      bar.start(total, 0);

      file.on("finish", function () {
        file.close();
        bar.stop();
        console.log("%s WordPress downloaded!", logStyle.done);
        resolve();
      });

      res.on("data", (chunk) => {
        current += chunk.length;
        bar.update(current);
      });

      res.on("error", () => {
        fs.unlink(dest);
        bar.stop();
        console.log("%s Error downloading WordPress ...", logStyle.error);
        reject();
      });
    }).on("error", function () {
      fs.unlink(dest);
      bar.stop();
      console.log("%s Error downloading WordPress ...", logStyle.error);
      reject();
    });
  });
};

const downloadWordpress = async () => {
  try {
    let isCacheExist = await checkWordpressCache();

    if (isCacheExist) {
      const questionsPrompt = await inquirer.prompt([
        {
          type: "confirm",
          name: "use_cache",
          message:
            "We found the WordPress installation from cache, do you want to use it?",
          default: true,
        },
      ]);
      if (questionsPrompt.use_cache) {
        return Promise.resolve();
      } else {
        doRealDownload();
      }
    } else {
      doRealDownload();
    }
  } catch (err) {
    console.log(err);
    Promise.reject();
  }
};

module.exports = downloadWordpress;
