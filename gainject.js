const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const gaFilePath = path.join(__dirname, 'ga.html');
const indexFilePath = path.join(__dirname, 'index.html');
let $;

readFile(indexFilePath)
    .then(function (data) {
        $ = cheerio.load(data);

        return readFile(gaFilePath);
    })
    .then(function (data) {
        $('head').append(data);

        return writeFile(indexFilePath, $.html());
    })
    .then(function (data) {
        console.log("Google Analytics was appended!");
    })
    .catch(function (err) {
        console.log('Error!', err);
    });


// Utils
function readFile(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, { encoding: 'utf-8' }, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

function writeFile(path, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, data, { encoding: 'utf-8' }, function (err) {
            if (err) reject(err);
            else resolve(data);
        });
    });
}