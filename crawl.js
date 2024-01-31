const { removeTrailingSlash } = require("./utils")
const { JSDOM } = require("jsdom");


function normalizeURL(urlString) {
  try {
    const url = new URL(urlString)
    return `https://${url.host}${removeTrailingSlash(url.pathname)}${url.search}${url.hash}`
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
    result.push(`${node.href[0] === "/" ? baseURL : ""}${node.href}`);
  })

  return result
}

async function crawlPage(baseURL, currentURL, pages) {
  if (!currentURL) {
    currentURL = normalizeURL(baseURL)
  }

  if (!pages) {
    pages = {}
  }

  baseURL = normalizeURL(baseURL)
  currentURL = normalizeURL(currentURL)


  if ((new URL(baseURL)).host !== (new URL(currentURL)).host) {
    // console.log("Got an external URL. Skipping...")
    return pages
  }

  const normalizedURL = normalizeURL(currentURL)

  if (pages[normalizedURL] !== undefined) {
    pages[normalizedURL]++
  } else {
    if (normalizedURL === normalizeURL(baseURL)) {
      pages[normalizedURL] = 0
    } else {
      pages[normalizedURL] = 1
    }

    try {
      const response = await fetch(currentURL)
      if (response.status > 400) {
        console.log("Request was unsuccessful")
        return pages
      }
      if (response.headers.get("content-type") !== "text/html; charset=utf-8") {
        // console.log(`ContentType was not text/html. Got: '${response.headers.get("content-type")}'`)
        return pages
      }

      const html = await response.text();
      const links = getURLsFromHTML(html, baseURL);

      for (let i = 0; i < links.length; i++) {
        pages = await crawlPage(baseURL, links[i], pages)
      }
    } catch (e) {
      console.log(e.message)
    }
  }
  return pages
}


function getSortedPagesKeys(pages) {
  var keys = Object.keys(pages);

  return keys.sort(function(a,b){
    return pages[b]-pages[a];
  });
}

function printReport(pages) {

  var keys = getSortedPagesKeys(pages);

  console.log("Report:");
  for (let i = 0; i < keys.length; i++) {
    console.log(`Found ${pages[keys[i]]} internal links to ${keys[i]}`)
  }

}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
  printReport
}
