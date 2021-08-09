export const goAsync = (promise) => {
  return promise
    .then((data) => [data, undefined])
    .catch((err) =>
      Promise.resolve([
        undefined,

        // if error happen but we got falsy value for the `error` variable, then
        // return true, so we can catch the error in the next code
        err || true,
      ]),
    );
};
