const assert = require('assert');
const { Matrix, zeros, ones, identity } = require('../../index');
const testUtils = require('../test.utils');


describe('blind create matrices from 1D or 2D data', function () {

    const chunkSize = 100000;
    this.timeout(chunkSize / 2);

    it('2D data ' + chunkSize + " times", function () {

        for (let i = 0; i < chunkSize; ++i) {
            try {
                const data = testUtils.randomSizeArray(64, 1, 64, 1, function () {
                    return Math.round(10000 * Math.random()) / 100 - 50;
                });
                const matrix = new Matrix(data);
                assert.ok(testUtils.compare(matrix, data, 1e-8));
            } catch (e) {
                assert.fail(e.message);
            }
        }

    });

    it('1D data ' + chunkSize + " times", function () {

        for (let i = 0; i < chunkSize; ++i) {
            const rows = Math.round(64 * Math.random() + 1);
            const data = testUtils.randomArray(rows, 1, function () {
                return Math.round(10000 * Math.random()) / 100 - 50;
            });

            try {
                const matrix = new Matrix(data);
                assert.ok(testUtils.compare(matrix, data, 1e-8));
            } catch (e) {
                assert.fail(e.message);
            }
        }

    });

    it('mixed 1D and 2D data ' + chunkSize + " times", function () {

        for (let i = 0; i < chunkSize; ++i) {
            const data = testUtils.randomSizeArray(64, 1, 64, 0, function () {
                return Math.round(10000 * Math.random()) / 100 - 50;
            });

            try {
                const matrix = new Matrix(data);
                assert.ok(testUtils.compare(matrix, data, 1e-8));
            } catch (e) {
                assert.fail(e.message);
            }
        }

    });

});

describe('zeros, ones and identities', function () {

    it('1D', function () {

        try {
            const expected = [0, 0, 0, 0, 0, 0, 0];
            const matrix = zeros(expected.length);
            assert.equal(7, matrix.rows());
            assert.equal(1, matrix.cols());
            assert.ok(testUtils.compare(matrix, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

        try {
            const expected = [1, 1, 1, 1];
            const matrix = ones(expected.length);
            assert.equal(4, matrix.rows());
            assert.equal(1, matrix.cols());
            assert.ok(testUtils.compare(matrix, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

    });

    it('2D', function () {

        try {
            const expected = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            const matrix = zeros(expected.length, expected[0].length);
            assert.equal(3, matrix.rows());
            assert.equal(3, matrix.cols());
            assert.ok(testUtils.compare(matrix, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

        try {
            const expected = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
            const matrix = ones(expected.length, expected[0].length);
            assert.equal(3, matrix.rows());
            assert.equal(3, matrix.cols());
            assert.ok(testUtils.compare(matrix, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

        try {
            const expected = [[1]];
            const matrix = identity(expected.length);
            assert.equal(1, matrix.rows());
            assert.equal(1, matrix.cols());
            assert.ok(testUtils.compare(matrix, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

        try {
            const expected = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
            const matrix = identity(expected.length);
            assert.equal(3, matrix.rows());
            assert.equal(3, matrix.cols());
            assert.ok(testUtils.compare(matrix, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

        try {
            const expected = [[1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1]];
            const matrix = identity(expected.length);
            assert.ok(testUtils.compare(matrix, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

    });

    it('negative calls results in exception', function () {

        try {
            const matrix = zeros(-10);
            assert.fail("Not thrown error for negative times");
        } catch (e){
            assert.ok(e.message.startsWith("illegal times to repeat -10"));
        }

        try {
            const matrix = ones(-10);
            assert.fail("Not thrown error for negative times");
        } catch (e){
            assert.ok(e.message.startsWith("illegal times to repeat -10"));
        }

        try {
            const matrix = identity(-10);
            assert.fail("Not thrown error for negative size");
        } catch (e){
            assert.ok(e.message.startsWith("illegal negative size -10"));
        }

        try {
            const matrix = identity();
            assert.fail("Not thrown error for undefined size");
        } catch (e){
            assert.ok(e.message.startsWith("size not defined"));
        }

    });

});

describe('wrong constructor calls', function () {

    it('undefined data should throw error', function () {
        try {
            const matrix = new Matrix(undefined);
            assert.fail("Not thrown error for undefined argument");
        } catch (e) {
            assert.ok(e.message == "data not provided");
        }
    });

    it('inconsistent parameters should throw error', function () {
        try {
            const matrix = new Matrix([[1, 2, 3], [4, 5, 6]], 3, 2);
            assert.fail("Not thrown error for unmatching parameters");
        } catch (e) {
            assert.ok(e.message == "data dimension is not compatible to provided rows and cols");
        }
    });

    it('data is not a rectangular matrix', function () {
        try {
            const matrix = new Matrix([[1, 2, 3], [4, 5]]);
            assert.fail("Not thrown error for non rectangular data");
        } catch (e) {
            assert.ok(e.message == "data is not a rectangular structure.");
        }

        try {
            const matrix = new Matrix([2, [4, 5]]);
            assert.fail("Not thrown error for non rectangular data");
        } catch (e) {
            assert.ok(e.message == "data is not a rectangular structure.");
        }
    });

    it('non numeric data into the array', function () {
        try {
            const matrix = new Matrix([[1, "2", 3], [4, 5, 6]]);
            assert.fail("Not thrown error for non numeric data");
        } catch (e) {
            assert.ok(e.message.includes("is not a number:"));
        }

        try {
            const matrix = new Matrix([[1], [2], "3", [4], [5]]);
            assert.fail("Not thrown error for non numeric data");
        } catch (e) {
            assert.ok(e.message.includes("is not a number:"));
        }

        try {
            const matrix = new Matrix([1, 2, 3, "4", 5, 6], 2, 3);
            assert.fail("Not thrown error for non numeric data");
        } catch (e) {
            assert.ok(e.message.includes("is not a number:"));
        }

        try {
            const matrix = new Matrix([1, 2, 3, false, 5, 6]);
            assert.fail("Not thrown error for non numeric data");
        } catch (e) {
            assert.ok(e.message.includes("is not a number:"));
        }

    });

    it('non iterable data', function () {
        try {
            const matrix = new Matrix(2);
            assert.fail("Not thrown error for non iterable data");
        } catch (e) {
            assert.ok(e.message.includes("data is not iterable"));
        }

    });

});

describe('empty or small data is valid', function () {

    it('1D [0] is valid', function () {
        try {
            const matrix = new Matrix([0]);
            assert.equal(1, matrix.rows());
            assert.equal(1, matrix.cols());
        } catch (e) {
            assert.fail("Should not throw error for [0]: " + e.message);
        }
    });

    it('2D [[0]] is valid', function () {
        try {
            const matrix = new Matrix([0]);
            assert.equal(1, matrix.rows());
            assert.equal(1, matrix.cols());
        } catch (e) {
            assert.fail("Should not throw error for [[0]]: " + e.message);
        }
    });

    it('1D [] is valid', function () {
        try {
            const matrix = new Matrix([]);
            assert.equal(0, matrix.rows());
            assert.equal(0, matrix.cols());
        } catch (e) {
            assert.fail("Should not throw error for []: " + e.message);
        }
    });

    it('2D [[]] is valid', function () {
        try {
            const matrix = new Matrix([[]]);
            assert.equal(1, matrix.rows());
            assert.equal(0, matrix.cols());
        } catch (e) {
            assert.fail("Should not throw error for [[]]: " + e.message);
        }
    });

    it('2D [[], []] is valid', function () {
        try {
            const matrix = new Matrix([[], []]);
            assert.equal(2, matrix.rows());
            assert.equal(0, matrix.cols());
        } catch (e) {
            assert.fail("Should not throw error for [[], []]: " + e.message);
        }
    });

});