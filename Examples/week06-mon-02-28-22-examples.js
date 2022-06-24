// built in node module that allows for interacting with the file system
const fs = require('fs');

// built in module that provides utilities for working with files and directory paths
const path = require('path');

// Read File
const simpleRead = (filename) => {
    const fullPath = path.resolve(__dirname, './files', filename);

    fs.readFile(fullPath, 'utf8', (err, result) => {
        if (!err) {
            console.log(result);
        } else {
            console.log(err);
        }
    });
};
simpleRead('small.txt');

// Reading Files and Perform Word Count
const files = ['large.txt', 'medium.txt', 'small.txt'];
const wordCount = (files) => {
    files.forEach((filename) => {
        const fullPath = path.resolve(__dirname, './files', filename);

        fs.readFile(fullPath, 'utf8', (err, result) => {
            if (!err) {
                const wordArray = result.split(' ');
                const wordCount = wordArray.length;

                console.log(`${filename} | ${wordCount}`);
            } else {
                console.log(err);
            }
        });
    });
};
wordCount(files);

// Write File
const writeFile = (filename, text) => {
    const fullPath = path.resolve(__dirname, './files', filename);

    fs.writeFile(fullPath, text, (err) => {
        if (!err) {
            console.log(`${filename} was written`);
        } else {
            console.log(err);
        }
    });
};
writeFile('graffiti.txt', 'Hello World!');
