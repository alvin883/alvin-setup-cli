import { copy as _copy } from "fs-extra";
import { goAsync } from "./go-async";
import { logStyle, log } from "./log-style";

/**
 * Copy file or folder.
 *
 * Note: if `source` is a directory it will copy everything inside of this
 * directory, not the entire directory itself, [see this link](https://github.com/jprichardson/node-fs-extra/blob/HEAD/docs/copy-sync.md)
 *
 * @param {string} source
 * @param {string} destination
 * @param {boolean} [silent] whether it should output operation detail to console or not
 * @deprecated use fs-extra copy instead
 */
export async function copy(source, destination) {
  const [, error] = await goAsync(
    _copy(source, destination, { overwrite: true }),
  );

  if (error) return Promise.reject(error);
  return Promise.resolve(true);
}
