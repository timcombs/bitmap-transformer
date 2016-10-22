const fs = require('fs');
var read = {};

read.readWrite = function readWrite(cb) {
  fs.readFile('./non-palette-bitmap.bmp', (err, data) => {
    if (err) throw err;
    console.log(data);

    //define new buffer and copy orig buffer to it
    const bufSize = data.length;
    const newBuf = Buffer.alloc(bufSize);
    data.copy(newBuf);

    //get image body offset from specific place in file
    const imgOffset = data.readInt32LE(10);
    console.log('imgOffset', imgOffset);
    //get bitsPerPixel
    const bitsPerPixel = data.readInt16LE(28);
    console.log('bpp', bitsPerPixel);

    for (let i = imgOffset; i < bufSize; i++) {
      newBuf[i] = 255 - newBuf[i];
    }

    fs.writeFile('./another-file.bmp', newBuf, cb);

  });
};

module.exports = read;



    //framework if i was going to use streams
    // var readStream = fs.createReadStream('./non-palette-bitmap.bmp');
    // var writeStream = fs.createWriteStream('./alt-bitmap.bmp');

    // readStream   // reads from myfile.txt
    //   .pipe(transformImage) //need to write this function
    //   .pipe(writeStream)  // writes to myfile.encrypted
    //           //eventEmitter & eventListener
    //   .on('finishTransform', (err) => {
    //     if (err) throw err;
    //     console.log('done encrypting');
    //   });
