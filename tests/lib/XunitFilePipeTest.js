// Generated by CoffeeScript 1.8.0
(function() {
  var Readable, XunitFilePipe, chai, expect, fs, isCoffee, tmp;

  fs = require('fs');

  chai = require("chai");

  expect = chai.expect;

  Readable = require('stream').Readable;

  tmp = require('tmp');

  isCoffee = require('./isCoffee');

  if (isCoffee) {
    XunitFilePipe = require('../../src/XunitFilePipe');
  } else {
    XunitFilePipe = require('../../lib/XunitFilePipe');
  }

  describe("XunitFilePipe", function() {
    return it("should correctly filter xunit XML and state data", function(done) {
      var fakeStdout, tmpFile, xunitFilePipe;
      fakeStdout = new Readable();
      fakeStdout.push('##_meteor_magic##xunit: bar\n##_meteor_magic##state: foo');
      fakeStdout.push(null);
      tmpFile = tmp.tmpNameSync();
      xunitFilePipe = new XunitFilePipe(fakeStdout, process.stderr, {
        pipeToFile: tmpFile
      });
      return setTimeout((function(_this) {
        return function() {
          var actual;
          actual = fs.readFileSync(tmpFile, {
            encoding: 'utf8'
          });
          expect(actual).to.equal('bar\n');
          fs.unlinkSync(tmpFile);
          return done();
        };
      })(this), 10);
    });
  });

}).call(this);