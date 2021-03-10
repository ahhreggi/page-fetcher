// Take a URL as a command-line argument as well as a local file path and download the resource to the specified path
// Example:
//   > node fetcher.js http://www.example.edu/ ./index.html
//   Downloaded and saved 3261 bytes to ./index.html

const fs = require('fs');
const readline = require('readline');

const url = process.argv[2] || '';
const path = process.argv[3] || '';

const request = require('request');

const writeToFile = function(path, body) {
  fs.writeFile(path, body, function(err) {
    // If an error occurs during file write, log an error message
    if (err) {
      console.log("An error occurred! Please ensure you have entered a valid URL and local file path.");
    // If the file write is successful, log a confirmation message
    } else {
      const size = fs.statSync(path).size;
      console.log(`Downloaded and saved ${size} bytes to ${path}`);
    }
  });
};

request(url, (error, response, body) => {
  // If the file doesn't exist, write to file
  if (!fs.existsSync(path)) {
    // Write to file
    writeToFile(path, body);
  // If the file already exists, ask to overwrite
  } else {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(`The specified path already exists. Overwrite? (Y/N): `, (ans) => {
      if (ans.toLowerCase() === 'y') {
        writeToFile(path, body);
      } else {
        console.log("Exiting app...");
      }
      rl.close();
    });
  }
});
