"use strict"
const assert = require('assert');
const { Matrix, zeros } = require('../../index');
const testUtils = require('../test.utils');

describe('transpose', function () {

    it('n x 1 and 1 x n transposes', function () {

        try {
            const expected = [[1, 2, 3, 4, 5, 6]];
            const A = new Matrix([[1], [2], [3], [4], [5], [6]]);
            const B = A.transpose();
            assert.ok(testUtils.compare(B, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }
        try {
            const expected = [[1], [2], [3], [4], [5], [6]];
            const A = new Matrix([[1, 2, 3, 4, 5, 6]]);
            const B = A.transpose();
            assert.ok(testUtils.compare(B, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

    });

    it('true 2D transposes', function () {

        try {
            const expected = [[1, 2, 3], [4, 5, 6]];
            const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
            const B = A.transpose();
            assert.ok(testUtils.compare(B, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }
        try {
            const expected = [[1, 4], [2, 5], [3, 6]];
            const A = new Matrix([[1, 2, 3], [4, 5, 6]]);
            const B = A.transpose();
            assert.ok(testUtils.compare(B, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

    });

    it('transposes inplace', function () {

        try {
            const expected = [[1, 2, 3], [4, 5, 6]];
            const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
            const C = zeros(2, 3);
            A.transpose(C);
            assert.ok(testUtils.compare(C, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }
        try {
            const expected = [[1, 2, 3, 4, 5, 6]];
            const A = new Matrix([[1], [2], [3], [4], [5], [6]]);
            const C = zeros(1, 6);
            A.transpose(C);
            assert.ok(testUtils.compare(C, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

    });

});

describe('map', function () {

    it('map inplace', function () {

        try {
            const expected = [[2, 8], [4, 10], [6, 12]];
            const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
            const C = zeros(3, 2);
            A.map(function (val) { return val * 2; }, C);
            assert.ok(testUtils.compare(C, expected, 1e-8));
        } catch (e) {
            assert.fail(e.message);
        }

    });
});

describe('get set', function () {

    it('basic', function () {

        try {
            const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
            const val = A.get(0, 1);
            assert.equal(4, A.get(0, 1));
            const newVal = val * 2;
            A.set(newVal, 0, 1);
            assert.equal(8, A.get(0, 1));
        } catch (e) {
            assert.fail(e.message);
        }

    });

    it('not set undefined', function () {

        try {
            const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
            A.set(undefined, 0, 1);
            assert.equal(4, A.get(0, 1));
        } catch (e) {
            assert.fail(e.message);
        }

    });

    it('copy initial parameters', function () {

        try {
            const original = [[2, 8], [4, 10], [6, 12]];
            const A = new Matrix(original);
            A.set(Math.PI, 0, 1);
            assert.equal(8, original[0][1]);
        } catch (e) {
            assert.fail(e.message);
        }

        try {
            const original = [2, 8, 4, 10, 6, 12];
            const A = new Matrix(original, 3, 2);
            A.set(Math.PI, 0, 1);
            assert.equal(8, original[1]);
        } catch (e) {
            assert.fail(e.message);
        }

    });

});

describe('sum, product', function () {

    it("basic", function () {

        const A = new Matrix([
            [1, 2],
            [3, 4],
            [5, 6]
        ]);

        const B = new Matrix([
            [2, 1],
            [2, -11]
        ]);

        const s = A.sum();
        const p = B.product();

        assert.equal(21, s);
        assert.equal(-44, p);

        assert.equal(0, new Matrix([]).product());

    });

});

describe('max', function () {

    it("max", function () {
        const A = new Matrix([
            [1, 2, 3], 
            [4, 0, 6], 
            [4, 9, 9], 
        ]);
        
        const result = A.max();
        assert.equal(9, result[0]);
        assert.equal(2, result[1]);
        assert.equal(1, result[2]);
    });

    it("linear", function () {
        const A = new Matrix([
            1, 2, 3, 
            4, 0, 6, 
            4, 9, 9, 
        ]);
        
        const result = A.max();
        assert.equal(9, result[0]);
        assert.equal(7, result[1]);
        assert.equal(0, result[2]);
    });

    it("empty", function () {
        const A = new Matrix([]);
        const result = A.max();
        assert.ok(!result);
    });

});

describe('min', function () {

    it("min", function () {
        const A = new Matrix([
            [1, -2, 3], 
            [4, 0, -3], 
            [4, -3, 1], 
        ]);
        
        const result = A.min();
        assert.equal(-3, result[0]);
        assert.equal(1, result[1]);
        assert.equal(2, result[2]);

    });

    it("linear", function () {
        const A = new Matrix([
            1, 2, 3, 
            4, 0, 6, 
            4, 9, 9, 
        ]);
        
        const result = A.min();
        assert.equal(0, result[0]);
        assert.equal(4, result[1]);
        assert.equal(0, result[2]);
    });

    it("empty", function () {
        const A = new Matrix([]);
        const result = A.min();
        assert.ok(!result);
    });

});