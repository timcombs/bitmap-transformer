const read = require('../lib/read');
const assert = require('assert');
const fs = require('fs');
const rimraf = require('rimraf');

describe('testing bitmap transfomer', () => {
  beforeEach(function(done) {
    rimraf('./another-file.bmp', done);
    console.log('rimraffed');
  });

  it('adds a new altered image', (done) => {
    console.log('adding image test running');
    read.readWrite('./non-palette-bitmap.bmp', () => {
      assert.ok(fs.existsSync('./another-file.bmp'));
      done();
    });
  });

  it('inverts the colrs, byte by byte', (done) => {
    console.log('value inversion test running');
    read.readWrite('./non-palette-bitmap.bmp', (data) => {
      //know specific byte info at buffer index 25000 = 132
      //color channel 0 - 255, so subtract 123 from 255
      assert.deepEqual(132, data[25000]);
      done();
    });
  });

  it('returns the proper transform', (done) => {
    console.log('proper transform test running');
    //run the transformation
    read.readWrite('non-palette-bitmap.bmp', (data) => {
      //get the golden chicken buffer
      fs.readFile('gc-value-invert.bmp', (err, gcBuf) => {
        if (err) throw err;
        //compare golden chicken vs transformed file
        assert.ok(gcBuf.equals(data));
        done();
      });
    });
  });

});