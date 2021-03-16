const { get } = require("https");
const fs = require("fs");
const logStyle = require("../../logStyle");
const ProgressBar = require("./progress-bar");

// const Downloader = require("mt-files-downloader");
// const printStats = function (dl, num) {
//   num = num || 1;
//   // const bar = new ProgressBar();
//   // bar.init(100);

//   var timer = setInterval(function () {
//     if (dl.status == 0) {
//       console.log("Download " + num + " not started.");
//     } else if (dl.status == 1) {
//       var stats = dl.getStats();
//       // bar.update(stats.total.completed);
//       console.log("Download " + num + " is downloading:");
//       console.log("Download progress: " + stats.total.completed + " %");
//       console.log(
//         "Download speed: " + Downloader.Formatters.speed(stats.present.speed),
//       );
//       console.log(
//         "Download time: " +
//           Downloader.Formatters.elapsedTime(stats.present.time),
//       );
//       console.log(
//         "Download ETA: " +
//           Downloader.Formatters.remainingTime(stats.future.eta),
//       );
//     } else if (dl.status == 2) {
//       console.log("Download " + num + " error... retrying");
//     } else if (dl.status == 3) {
//       console.log("Download " + num + " completed !");
//     } else if (dl.status == -1) {
//       console.log("Download " + num + " error : " + dl.error);
//     } else if (dl.status == -2) {
//       console.log("Download " + num + " stopped.");
//     } else if (dl.status == -3) {
//       console.log("Download " + num + " destroyed.");
//     }

//     console.log("------------------------------------------------");

//     if (dl.status === -1 || dl.status === 3 || dl.status === -3) {
//       clearInterval(timer);
//       timer = null;
//     }
//   }, 1000);
// };

const downloadWordpress = async () => {
  try {
    const url = "https://wordpress.org/latest.zip";
    const dest = "wordpress.zip";
    const file = fs.createWriteStream(dest);
    const bar = new ProgressBar();

    console.log("%s Start downloading WordPress ...", logStyle.process);
    return new Promise((resolve, reject) => {
      get(url, function (res) {
        const total = res.headers["content-length"];
        let current = 0;
        res.pipe(file);
        bar.init(total);

        file.on("finish", function () {
          file.close();
          console.log("%s WordPress downloaded!", logStyle.done);
          resolve();
        });

        res.on("data", (chunk) => {
          current += chunk.length;
          bar.update(current);
        });

        res.on("error", () => {
          fs.unlink(dest);
          console.log("%s Error downloading WordPress ...", logStyle.error);
          reject();
        });

        // res.on("end", () =>
        //   console.log("%s Response is finish!", logStyle.done),
        // );
      }).on("error", function () {
        fs.unlink(dest);
        console.log("%s Error downloading WordPress ...", logStyle.error);
        reject();
      });
    });

    // .on("response", function (data) {
    //   console.log(data.headers["content-length"]);
    // });

    // const downloader = new Downloader();
    // const dl = downloader.download(url, dest);
    // dl.start();
    // printStats(dl);
  } catch (err) {
    Promise.reject();
  }
};

module.exports = downloadWordpress;
