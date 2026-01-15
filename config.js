const Store = require('electron-store');
const packagejson = require("./package.json")
const store = new Store();
module.exports = {
  newsfeed: (gitRemote) => {
    return `https://pinokiocomputer.github.io/home/item?uri=${gitRemote}&display=feed`
  },
  profile: (gitRemote) => {
    return `https://pinokiocomputer.github.io/home/item?uri=${gitRemote}&display=profile`
  },
  site: "https://pinokio.co",
  discover_dark: "https://beta.pinokio.co",
  discover_light: "https://beta.pinokio.co",
  portal: "https://beta.pinokio.co",
  docs: "https://pinokio.co/docs",
  install: "https://pinokiocomputer.github.io/program.pinokio.computer/#/?id=install",
  agent: "electron",
  version: packagejson.version,
  store
}
