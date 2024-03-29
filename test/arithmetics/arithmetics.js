const assert = require('assert');
const { Matrix, zeros } = require('../../index');
const testUtils = require('../test.utils');

describe('unmatched dimensions should throw error', function () {

    it('multiplying wrong dimensions', function () {
        try {
            const A = new Matrix([[1, 2, 3], [4, 5, 6]]);
            const B = new Matrix([[1, 2, 3], [4, 5, 5]]);
            A.multiply(B);
            assert.fail("Not thrown error for unmatched dimensions");
        } catch (e){
            assert.ok(e.message.startsWith("Incompatible matrices to multiply"));
        }

        try {
            const A = new Matrix([[1, 2, 3], [4, 5, 6]]);
            const B = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            A.add(B);
            assert.fail("Not thrown error for unmatched dimensions");
        } catch (e){
            assert.ok(e.message.startsWith("It is not possible to add"));
        }
    });

    it('adding wrong dimensions', function () {
        try {
            const A = new Matrix([[1, 2, 3], [4, 5, 6]]);
            const B = new Matrix([[1, 2], [4, 5]]);
            A.add(B);
            assert.fail("Not thrown error for unmatched dimensions");
        } catch (e){
            assert.ok(e.message.startsWith("It is not possible to add"));
        }

        try {
            const A = new Matrix([[1, 2, 3], [4, 5, 6]]);
            const B = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            A.add(B);
            assert.fail("Not thrown error for unmatched dimensions");
        } catch (e){
            assert.ok(e.message.startsWith("It is not possible to add"));
        }
    });

    it('subtract wrong dimensions', function () {
        try {
            const A = new Matrix([[1, 2, 3], [4, 5, 6]]);
            const B = new Matrix([[1, 2], [4, 5]]);
            A.subtract(B);
            assert.fail("Not thrown error for unmatched dimensions");
        } catch (e){
            assert.ok(e.message.startsWith("It is not possible to subtract"));
        }

        try {
            const A = new Matrix([[1, 2, 3], [4, 5, 6]]);
            const B = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            A.subtract(B);
            assert.fail("Not thrown error for unmatched dimensions");
        } catch (e){
            assert.ok(e.message.startsWith("It is not possible to subtract"));
        }
    });

    it('dotMultiplying wrong dimensions', function () {
        try {
            const A = new Matrix([[1, 2, 3], [4, 5, 6]]);
            const B = new Matrix([[1, 2], [4, 5]]);
            A.dotMultiply(B);
            assert.fail("Not thrown error for unmatched dimensions");
        } catch (e){
            assert.ok(e.message.startsWith("It is not possible to dot multiply"));
        }

        try {
            const A = new Matrix([[1, 2, 3], [4, 5, 6]]);
            const B = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            A.dotMultiply(B);
            assert.fail("Not thrown error for unmatched dimensions");
        } catch (e){
            assert.ok(e.message.startsWith("It is not possible to dot multiply"));
        }
    });

});

describe('checking inplace operations', function () {

    it('dotMultiplying inplace', function () {

        try {
            const expected = [[7, 32], [18, 50], [33, 72]];
            const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
            const B = new Matrix([[7, 8], [9, 10], [11, 12]]);
            const C = zeros(3, 2);
            A.dotMultiply(B, C);
            assert.ok(testUtils.compare(C, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

    });

    it('add inplace', function () {

        try {
            const expected = [[8, 12], [11, 15], [14, 18]];
            const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
            const B = new Matrix([[7, 8], [9, 10], [11, 12]]);
            const C = zeros(3, 2);
            A.add(B, C);
            assert.ok(testUtils.compare(C, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

    });

    it('subtract inplace', function () {

        try {
            const expected = [[-6, -4], [-7, -5], [-8, -6]];
            const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
            const B = new Matrix([[7, 8], [9, 10], [11, 12]]);
            const C = zeros(3, 2);
            A.subtract(B, C);
            assert.ok(testUtils.compare(C, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

    });

    it('multiply by scalar inplace', function () {

        try {
            const expected = [[2, 8], [4, 10], [6, 12]];
            const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
            const C = zeros(3, 2);
            A.multiplyByScalar(2, C);
            assert.ok(testUtils.compare(C, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

    });

    it('multiplication inplace', function () {

        try {
            const expected = [[43, 48], [59, 66], [75, 84]];
            const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
            const B = new Matrix([[7, 8], [9, 10]]);
            const C = zeros(3, 2);
            A.multiply(B, C);
            assert.ok(testUtils.compare(C, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

    });

});

describe('add scalar', function () {

    it('adding 7', function () {

        try {
            const expected = [[8, 11], [9, 12], [10, 13]];
            const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
            const C = A.addScalar(7);
            assert.ok(testUtils.compare(C, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

    });

    it('subtracting 3', function () {

        try {
            const expected = [[-2, 1], [-1, 2], [0, 3]];
            const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
            const C = A.addScalar(-3);
            assert.ok(testUtils.compare(C, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

    });

    it('inplace adding scalar', function () {

        try {
            const expected = [[-2, 1], [-1, 2], [0, 3]];
            const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
            const C = zeros(3, 2);
            A.addScalar(-3, C);
            assert.ok(testUtils.compare(C, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

    });

});

describe('add column and row', function () {

    it('adding column', function () {

        try {
            const expected = [[2, 5], [4, 7], [6, 9]];
            const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
            const C = A.addColumn([1, 2, 3]);
            assert.ok(testUtils.compare(C, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

    });

    it('adding row', function () {

        try {
            const expected = [[3, 3], [4, 4], [5, 5]];
            const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
            const C = A.addRow([2, -1]);
            assert.ok(testUtils.compare(C, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

    });

    it('adding column in place', function () {

        try {
            const expected = [[2, 5], [4, 7], [6, 9]];
            const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
            const C = zeros(3, 2);
            A.addColumn([1, 2, 3], C);
            assert.ok(testUtils.compare(C, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

    });

    it('adding row in place', function () {

        try {
            const expected = [[3, 3], [4, 4], [5, 5]];
            const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
            const C = zeros(3, 2);
            A.addRow([2, -1], C);
            assert.ok(testUtils.compare(C, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

    });

});
