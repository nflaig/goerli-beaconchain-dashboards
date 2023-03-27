import fs from "fs";
import open from "open";

// Define the filename of the text file with validator URLs
const filename = "dashboard-urls.txt";

// Read the validator URLs from the text file
const urls = fs
  .readFileSync(filename, "utf-8")
  .trim() // Remove any leading/trailing white space
  .split("\n"); // Split the text file into an array of URLs

// Open the URLs in Google Chrome
urls.forEach((url) => open(url, { app: "google chrome" }));
