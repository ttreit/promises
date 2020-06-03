/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // TODO
  return fs.readFile(filePath, (err, res) => {
    if (err) {
      callback (err, null);
    } else {
      callback(null, res.toString('utf8').split('\n')[0]);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  // TODO
  // var xhr = new XMLHttpRequest();
  // xhr.open('GET', url);
  // xhr.send();

  // xhr.onload = function(){
  //   console.log("==================", xhr.statusText, xhr.status);
  //   if(xhr.status === 200){
  //     callback(null, xhr.status);
  //   }
  // };
  // xhr.onerror = function(){
  //   console.log("----------------", xhr.statusText, xhr.status, xhr.responseText);
  //   callback(xhr.statusText, xhr.status);
  // }
  request(url, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
