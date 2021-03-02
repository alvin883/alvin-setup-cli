const cp = require("child_process");

const setupNextjs = () => {
  cp.exec("mkdir nextjs");
};

module.exports = setupNextjs;
