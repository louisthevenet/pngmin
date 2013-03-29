'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.pngmin = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(2);

    var actual = grunt.file.read('tmp/pngquant-logo-fs8.png');
    var expected = grunt.file.read('test/expected/pngquant-logo-fs8.png');
    test.equal(actual.length, expected.length, 'should be the same size as the test file.');

    test.ok(!grunt.file.exists('tmp/pngquant-logo.png'));

    test.done();
  },
  ext_test: function(test) {
    test.expect(2);

    var actual = grunt.file.read('tmp/pngquant-logo-custom.png');
    var expected = grunt.file.read('test/expected/pngquant-logo-fs8.png');
    test.equal(actual, expected, 'sould be the same size as the test file.');

    test.ok(!grunt.file.exists('tmp/pngquant-logo.png'));

    test.done();
  },
  force_test: function(test) {
    test.expect(2);

    var actual = grunt.file.read('tmp/force/force1.png');
    var expected = grunt.file.read('test/expected/pngquant-logo-fs8.png');
    test.equal(actual, expected, 'sould be the same size as the optimized file.');

    actual = grunt.file.read('tmp/force/force2.png');
    expected = grunt.file.read('test/fixtures/pngquant-logo.png');
    test.equal(actual, expected, 'should be the same size as the non-optimized file.');

    test.done();
  },
  multiple_test: function(test) {
    test.expect(1);

    var actual = grunt.file.expand('tmp/multiple/*.png');
    var expected = 10;
    test.equal(actual.length, expected, 'should be 10 images');

    test.done();
  },
  subdir_test: function(test) {
    test.expect(4);

    var actual = grunt.file.expand('tmp/subdir_test/*.png');
    var expected = 1;
    test.equal(actual.length, expected, 'should be just 1 image');
    test.ok(grunt.file.isFile(actual[0]), 'should be a file and not a directory!');

    test.ok(grunt.file.isDir('tmp/subdir_test/subdir1'), 'there should be subdir1 folder');
    test.ok(grunt.file.isDir('tmp/subdir_test/subdir2'), 'there should be subdir2 folder');

    test.done();
  },
  increase_test: function(test) {
    test.expect(3);

    var optimized = grunt.file.read('tmp/increase_test/glyphicons-halflings.png');
    var nonOptimized = grunt.file.read('test/fixtures/increase_test/glyphicons-halflings.png');
    test.ok(optimized.length < nonOptimized.length, 'optimized image should be smaller');

    // the white icons are getting bigger if one tries to optimize them with pngquant
    // so pngmin should skip this file and just copy the source file to the destination
    test.ok(grunt.file.exists('tmp/increase_test/glyphicons-halflings-white.png'), 'file should be copied to the destination even if it wasn\'t optimized');
    var skippedFile = grunt.file.read('tmp/increase_test/glyphicons-halflings-white.png');
    var original = grunt.file.read('test/fixtures/increase_test/glyphicons-halflings-white.png');

    test.equal(skippedFile.length, original.length, 'files should be the same size!');

    test.done();
  },
  dest_test: function(test) {
    test.expect(1);

    var expected = 'tmp/dest_test/pngquant-logo.png';

    test.ok(grunt.file.exists(expected) && grunt.file.isFile(expected), 'Image should be at the destination, even if we didn\'t use a directory as dest option!');

    test.done();
  },
  exists_test: function(test) {
    test.expect(2);

    var actual = grunt.file.read('tmp/exists_test/pngquant-logo.png');
    var expected = grunt.file.read('test/expected/pngquant-logo-fs8.png');
    test.equal(actual, expected, 'there should be one optimized image.');

    actual = grunt.file.expand('tmp/exists_test/*.png');
    expected = 1;
    test.equal(actual.length, expected, 'should be just 1 image');

    test.done();
  }
};
