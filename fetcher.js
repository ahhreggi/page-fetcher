// Take a URL as a command-line argument as well as a local file path and download the resource to the specified path
// Example:
//   > node fetcher.js http://www.example.edu/ ./index.html
//   Downloaded and saved 3261 bytes to ./index.html

const fs = require('fs');

const url = process.argv[2];
const path = process.argv[3];

const request = require('request');
request(url, (error, response, body) => {
  if (error) {
    console.log("Invalid URL");
  } else {
    if (!fs.existsSync(path)) {
      // Write to file
      writeToFile(path, body);
    } else {
      console.log("File already exists!");
    }
  }
});

const writeToFile = function(path, body) {
  fs.writeFile(path, body, function(err) {
    if (err) throw err;
    const size = fs.statSync(path).size;
    console.log(`Downloaded and saved ${size} bytes to ${path}`);
  });
};