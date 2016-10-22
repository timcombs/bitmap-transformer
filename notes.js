




//In computing, although the grayscale can be computed through rational numbers, image pixels are stored in binary, quantized form. Some early grayscale monitors can only show up to sixteen (4-bit) different shades, but today grayscale images (as photographs) intended for visual display (both on screen and printed) are commonly stored with 8 bits per sampled pixel, which allows 256 different intensities (i.e., shades of gray) to be recorded, typically on a non-linear scale. The precision provided by this format is barely sufficient to avoid visible banding artifacts, but very convenient for programming because a single pixel then occupies a single byte.


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

    //value invert
    for (let i = imgOffset; i < bufSize; i++) {
      newBuf[i] = 255 - newBuf[i];
    }

    for (let i = imgOffset; i < bufSize - 2; i + 3) {
      newBuf[i] = hhhh;
      //0.21 * r + 0.72 * g + 0.07 * b
      //0.21 * newBuf[i] + 0.72 * newBuf[i + 1] + 0.07 * newBuf[i + 2]
    }

    fs.writeFile('./another-file.bmp', newBuf, cb);

  });
};

module.exports = read;

if (i % 3 === 0 || i === 0) {
        var rTransform = (0.21 * parseInt(newBuf[i], 16)).toString(16);
        var gTransform = (0.72 * parseInt(newBuf[i], 16)).toString(16);
        var bTransform = (0.07 * parseInt(newBuf[i], 16)).toString(16);
        
      }
    }

        // //broken grayscale
        // console.log('r', rTransform, 'g', gTransform, 'b', bTransform);
        // newBuf[i] = rTransform;
        // newBuf[i + 1] = gTransform;
        // newBuf[i + 2] = bTransform;
        // //0.21 * r + 0.72 * g + 0.07 * b
        // //0.21 * newBuf[i] + 0.72 * newBuf[i + 1] + 0.07 * newBuf[i + 2]

    //working value invert
    // const rLum = 0.21;
    // const gLum = 0.72;



    // const bLum = 0.07;
    // console.log('r', rLum.toString(16), 'g', gLum.toString(16), 'b', bLum.toString(16));
    // newBuf[i] = rLum.toString(16) * newBuf[i];
    // newBuf[i + 1] = gLum.toString(16) * newBuf[i + 1];
    // newBuf[i + 2] = bLum.toString(16) * newBuf[i + 2];


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
