const read = require('../lib/read');
const assert = require('assert');
const fs = require('fs');

describe('testing bitmap transfomer', () => {
  it('inverts the colors', (done) => {
    function invertTest() {
      //select a specific indexed pixel before mutation
        //we know its rgb values
        //then subtract it from 255
      //run readWrite
      //select the same indexed pixel after mutation
      //assert that transformed is what we expect

      console.log('in the invert test');
      done();
    }
    read.readWrite(invertTest);
  });

  it('returns the proper transform', (done) => {
    function transformTest() {
      //get golden-chicken buffer
      //run readWrite on test.file
      //assert that golden-chicken is same as transformed
        //need buffer compare function
      console.log('in the proper transform test');
      done();
    }
    read.readWrite(transformTest);
  });


});