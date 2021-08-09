import path from "path";
import { promises as fs } from "fs";
import { goAsync } from "../../utils";

export const replaceCommand = async (folderName) => {
  const filePath = path.join(process.cwd(), folderName, "package.json");

  const [readData, readErrror] = await goAsync(fs.readFile(filePath, "utf-8"));
  if (readErrror) return Promise.reject(readErrror);

  let newData = readData;

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

  const [, writeError] = await goAsync(
    fs.writeFile(filePath, newData, "utf-8"),
  );
  if (writeError) return Promise.reject(writeError);

  return Promise.resolve(true);
};
