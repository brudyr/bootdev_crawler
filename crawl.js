const { removeTrailingSlash } = require("./utils")
const { JSDOM } = require("jsdom");


function normalizeURL(urlString) {
  try {
    const url = new URL(urlString)
    return `${url.host}${removeTrailingSlash(url.pathname)}${url.search}${url.hash}`
  } catch (e) {
    console.log("The entered string is not a valid url")
    return null
  }
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);

  const linkNodes = dom.window.document.querySelectorAll("a");
  const result = [];
  linkNodes.forEach( node => {
    result.push(`${baseURL}${node.href}`);
  })

  return result
}

module.exports = {
  normalizeURL,
  getURLsFromHTML
}
