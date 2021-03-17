# alvin-setup-cli

[![npm (scoped)](https://img.shields.io/npm/v/alvin-setup-cli.svg)](https://www.npmjs.com/package/alvin-setup-cli)

One liner script to manage all of my setup

### How to use it?

Just run `npx alvin-setup-cli` and you're good to go

### How to create a new setup option?

- Open `src/cli.js`
- Inside the `questionsPrompt` function there is `questions`, add new option object
  ```javascript
  {
      name: "string to be displayed to the user",
      value: "this has to be the same with a folder name",
      short: "short string to be displayed after user choose the setup"
  }
  ```
- Add a new folder with the same name as `value` that you've wrote
- Add `index.js` inside that new folder, and create a function there
