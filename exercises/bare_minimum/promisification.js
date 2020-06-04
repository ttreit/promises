/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */

var fs = require('fs');
var request = require('request');
var crypto = require('crypto');
var Promise = require('bluebird');

// (0) writeFile
// var writeFile = function(file, data, callback) {
//   fs.writeFile(file, data, 'utf8', (err) => {
//     if (err) {
//       callback(err);
//     }
//   })
// };

// var writeFileAsync = Promise.promisifyAll(writeFile);

// (1) Asyncronous HTTP request
var getGitHubProfile = function (user, callback) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true, // will JSON.parse(body) for us
  };

  request.get(options, function (err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(
        new Error('Failed to get GitHub profile: ' + body.message),
        null
      );
    } else {
      callback(null, body);
    }
  });
};
// someFunction(){return new Promise}   --> someFunction().then().catch()
// anotherFunc(){callback(something)}  --> anotherFunc((something) => {do something})
// thirdWayFunc(){callback(stuff)}   --> thirdWayFunc().then().catch();
var getGitHubProfileAsync = Promise.promisify(getGitHubProfile); // TODO

// (2) Asyncronous token generation
var generateRandomToken = function (callback) {
  crypto.randomBytes(20, function (err, buffer) {
    if (err) {
      return callback(err, null);
    }
    callback(null, buffer.toString('hex'));
  });
};

var generateRandomTokenAsync = Promise.promisify(generateRandomToken);

// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function (err, file) {
      if (err) {
        // return callback(err);
        reject(err);
      } else {
        let funnyFile = file
          .split('\n')
          .map(function (line) {
            return line + ' lol';
          })
          .join('\n');
        resolve(funnyFile);
        // resolve
        // callback(funnyFile); (null, funnyFile) would be correct b/c it would use error first callback pattern
      }
    });
  });

};

var readFileAndMakeItFunnyAsync = Promise.promisifyAll(readFileAndMakeItFunny); // TODO WHY DOES ALL WORK????

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync,
};
