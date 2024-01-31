const { removeTrailingSlash } = require("./utils")

function normalizeURL(urlString) {
  try {
    const url = new URL(urlString)
    return `${url.host}${removeTrailingSlash(url.pathname)}${url.search}${url.hash}`
  } catch (e) {
    console.log("The entered string is not a valid url")
    return null
  }
}

module.exports = {
  normalizeURL
}
