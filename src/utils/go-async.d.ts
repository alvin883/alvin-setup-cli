// reference: https://www.jpwilliams.dev/how-to-unpack-the-return-type-of-a-promise-in-typescript
type UnwrapPromise<T> = T extends Promise<infer U>
  ? U
  : T extends (...args: any) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : T;

/**
 * Returns Go / Lua like responses when used with await
 *
 * @example
 * // Basic usage
 * const [response, error] = await goAsync(promise);
 * // return [data, undefined] or [undefined, Error]
 *
 *
 * // With Promise.all()
 * const all = Promise.all([ promise1, promise2 ]);
 * const [responses, error] = await goAsync(all);
 * // return [[data1, data2], undefined] or [undefined, Error];
 *
 *
 * // With Promise.race()
 * const race = Promise.race([ promise1, promise2 ]);
 * const [responses, error] = await goAsync(race);
 * // return [data, undefined] or [undefined, Error];
 *
 * @param promise
 * @returns [ data, error ]
 */
export declare const goAsync: <T extends Promise>(
  promise: T
) => [undefined | UnwrapPromise<T>, undefined | Error];
