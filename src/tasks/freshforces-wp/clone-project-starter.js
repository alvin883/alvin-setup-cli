const cp = require("child_process");

const cloneProjectStarter = async (dirPath) => {
  cp.execSync(
    `git clone https://github.com/freshforces-borndigital/project-starter.git .`,
    {
      stdio: "inherit",
      cwd: `./${dirPath}`,
    },
  );

  return Promise.resolve();
};

module.exports = cloneProjectStarter;
