//fs file to read
//create buffer from bitmap
//read header to find where to change color
//write a transform on buffer
//write buffer to new bitmapd

const fs = require('fs');
var read = {};

read.readWrite = function readWrite() {
  fs.readFile('./palette-bitmap.bmp', (err, buffer) => {
    console.log(buffer);
    fs.writeFile('./another-file.bmp', buffer, cb);
  });

  function cb(err) {
    if (err) return err;
    console.log('finished');
  }
};

module.exports = read;