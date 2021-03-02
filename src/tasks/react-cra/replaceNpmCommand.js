const path = require("path");
const fs = require("fs");

const { done: styleDone } = require("../../logStyle");

const replaceNpmCommand = (folderName) => {
  const filePath = path.join(process.cwd(), folderName, "package.json");

  fs.readFile(filePath, "utf-8", function (err, data) {
    if (err) throw err;

    let newData = data;

    newData = newData.replace(
      /\"start\": \"react-scripts start\"/gim,
      '"start": "craco start"',
    );

    newData = newData.replace(
      /\"build\": \"react-scripts build\"/gim,
      '"build": "craco build"',
    );

    newData = newData.replace(
      /\"test\": \"react-scripts test\"/gim,
      '"test": "craco test"',
    );

    fs.writeFile(filePath, newData, "utf-8", function (err) {
      if (err) throw err;
      console.log("%s Script updated successfully!", styleDone);
    });
  });
};

module.exports = replaceNpmCommand;
