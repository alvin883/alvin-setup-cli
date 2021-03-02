const cp = require("child_process");

const setupFreshforcesWp = () => {
  cp.exec("mkdir freshforces-wp");
};

module.exports = setupFreshforcesWp;
