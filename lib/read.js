const fs = require('fs');
var read = {};

read.readWrite = function readWrite(filepath, cb) {
  fs.readFile(filepath, (err, data) => {
    if (err) throw err;

    //define new buffer and copy orig buffer to it
    const bufSize = data.length;
    const newBuf = Buffer.alloc(bufSize);
    data.copy(newBuf);
    
    //to get pixel to test before mutation
    //console.log('data', data[25000]);

    //object to hold header and file info as properties
    read.fileData = {
      fileBuf: newBuf,
      fileHeader: newBuf.readIntLE(0,2).toString(16),
      fileSize: newBuf.readIntLE(2,6).toString(16),
      resArea1: newBuf.readIntLE(6,8).toString(16),
      resArea2: newBuf.readIntLE(8,10).toString(16),
      imgOffset: newBuf.readInt32LE(10),
      bitsPerPixel: data.readInt16LE(28)
    };

    //working visual invert
    for (let i = read.fileData.imgOffset; i < bufSize; i++) {
      read.fileData.fileBuf[i] = 255 - read.fileData.fileBuf[i];
    }

    // //operates on three bytes at once
    // for (let i = read.fileData.imgOffset; i < bufSize - 2; i++) {
    //   if (i % 3 === 0) {
    //     //working gray scale by avg
    //     var pixelAvg = (read.fileData.fileBuf[i] + read.fileData.fileBuf[i+1] + read.fileData.fileBuf[i+2])/3;
    //     for (let j = 0; j < 3; j++) {
    //       newBuf[i+j] = pixelAvg;
    //     }
    //   }
    // }
    
    fs.writeFile('./another-file.bmp', newBuf, (err) => {
      if (err) return err;
      cb(newBuf);
      return newBuf;
    });
  });
};

module.exports = read;

    //potential framework leading toward using streams
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
