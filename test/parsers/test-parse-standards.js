var assert = require('assert');
var async = require('async');
var parse = require('../../lib/parsers');

var example = ["1", "2", "2", "3", "3", "3"];
var emptyExample = [];

describe('Standards parser', function () {
  it('should return an array', function () {
    assert.equal(Object.prototype.toString.call(parse.standards(example)), "[object Array]");
  });
  
  it('should contain only numbers', function (done) {
    async.every(parse.standards(example), parse.numerality, function (result) {
      assert.ok(result);
      done();
    });
  });
  
  it('should pass along an empty array if it receives one', function () {
    assert.deepEqual(parse.standards(emptyExample), []);
  });
});