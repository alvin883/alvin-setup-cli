import util from "util";
import { exec } from "child_process";

/**
 * Promisified exec
 * TODO: research how to stream and write stdio with this promisify version
 */
export const execPromise = util.promisify(exec);
