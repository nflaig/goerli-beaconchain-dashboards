import fs from "fs";
import axios from "axios";

// Define the filename of the text file with public keys
const filename = process.argv[2] || "deposit-data.txt";

// Read the public keys from the text file
const jsonData = fs
  .readFileSync(filename, "utf-8")
  .trim() // Remove any leading/trailing white space
  .split("\n") // Split the text file into an array of lines
  .map((line) => JSON.parse(line)); // Parse each line as JSON

// Define the function to send HTTP requests to the API
async function sendRequest(pubkeys) {
  const url = `https://goerli.beaconcha.in/api/v1/validator/${pubkeys.join(",")}`;
  const response = await axios.get(url);
  const jsonData = response.data;
  if (jsonData.status === "OK") {
    const validatorIndexes = jsonData.data.map((validator) => validator.validatorindex);
    return validatorIndexes;
  } else {
    throw new Error(`API request failed with status: ${jsonData.status}`);
  }
}

// Define the main function to execute
async function main() {
  const pubkeys = jsonData.map((entry) => entry.pubkey);
  const validatorIndexes = [];
  for (let i = 0; i < pubkeys.length; i += 80) {
    const pubkeysSubset = pubkeys.slice(i, i + 80);
    const subsetValidatorIndexes = await sendRequest(pubkeysSubset);
    validatorIndexes.push(...subsetValidatorIndexes);
    // wait 2 seconds to avoid running into rate limit errors
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  console.log(validatorIndexes);
  fs.writeFileSync("validator-indexes.json", JSON.stringify(validatorIndexes));
}

// Execute the main function
await main();
