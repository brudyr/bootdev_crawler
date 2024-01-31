const { crawlPage, printReport } = require("./crawl")

async function main() {
  if (process.argv.length !== 3) {
    console.log("The programm expects exactly one argument: 'npm start BASE_URL'");
    return
  }
  console.log("Starting crawl...")
  const pages = await crawlPage("https://wagslane.dev")
  console.log("Crawl finished. Printing report...")
  printReport(pages)

}

main()
