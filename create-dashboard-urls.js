import fs from "fs";

// Define the filename of the JSON file with validator indexes
const filename = "validator-indexes.json";

// Read the validator indexes from the JSON file
const validatorIndexes = JSON.parse(fs.readFileSync(filename, "utf-8"));

// Define the function to create URLs for groups of validator indexes
function createUrls(validatorIndexes) {
  const urls = [];
  for (let i = 0; i < validatorIndexes.length; i += 100) {
    const subset = validatorIndexes.slice(i, i + 100);
    const url = `https://goerli.beaconcha.in/dashboard?validators=${subset.join(",")}`;
    urls.push(url);
  }
  return urls;
}

// Create the URLs and write them to a text file
const urls = createUrls(validatorIndexes);
fs.writeFileSync("dashboard-urls.txt", urls.join("\n"));

// Log the number of validator indexes and URLs written to the file
console.log(`Wrote ${validatorIndexes.length} validator indexes to ${urls.length} URLs`);
