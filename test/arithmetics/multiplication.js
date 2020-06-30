const assert = require('assert');

const MatrixReef = require('../../index');
const MathJS = require('mathjs');
const testUtils = require('../test.utils');

describe('basic multiplications', function () {

    it("3x2 x 2x2", function () {

        const A = new MatrixReef.Matrix([
            [1, 2], 
            [3, 4], 
            [5, 6]
        ]); 
        
        const B = new MatrixReef.Matrix([
            [2, 1], 
            [2, 0]
        ]);
        
        const C = A.multiply(B);

        assert.equal(3, C.rows()); 
        assert.equal(2, C.cols()); 

        assert.equal(6, C.get(0, 0)); assert.equal(1, C.get(0, 1));
        assert.equal(14, C.get(1, 0)); assert.equal(3, C.get(1, 1));
        assert.equal(22, C.get(2, 0)); assert.equal(5, C.get(2, 1));

    });

    it("5x3 x 3x4", function () {

        const A = new MatrixReef.Matrix([
            [1, 2, 3], 
            [3, 4, 3], 
            [5, 6, 1],
            [2, -1, 8],
            [1, -10, 5]
        ]); 
        
        const B = new MatrixReef.Matrix([
            [2, 1, 2, 5], 
            [2, 0, 3, -3], 
            [1, 10, 2, 4]
        ]); 

        const C = A.multiply(B);

        assert.equal(5, C.rows()); 
        assert.equal(4, C.cols()); 

        assert.equal(  9, C.get(0, 0)); assert.equal(31, C.get(0, 1)); assert.equal( 14, C.get(0, 2)); assert.equal(11, C.get(0, 3));
        assert.equal( 17, C.get(1, 0)); assert.equal(33, C.get(1, 1)); assert.equal( 24, C.get(1, 2)); assert.equal(15, C.get(1, 3));
        assert.equal( 23, C.get(2, 0)); assert.equal(15, C.get(2, 1)); assert.equal( 30, C.get(2, 2)); assert.equal(11, C.get(2, 3));
        assert.equal( 10, C.get(3, 0)); assert.equal(82, C.get(3, 1)); assert.equal( 17, C.get(3, 2)); assert.equal(45, C.get(3, 3));
        assert.equal(-13, C.get(4, 0)); assert.equal(51, C.get(4, 1)); assert.equal(-18, C.get(4, 2)); assert.equal(55, C.get(4, 3));

    });

    it("4x1 x 1x3", function () {

        const A = new MatrixReef.Matrix([
            [1], 
            [3], 
            [5],
            [2]
        ]); 
        
        const B = new MatrixReef.Matrix([
            [2, 1, 2]
        ]); 

        const C = A.multiply(B);

        assert.equal(4, C.rows()); 
        assert.equal(3, C.cols()); 

        assert.equal( 2, C.get(0, 0)); assert.equal(1, C.get(0, 1)); assert.equal( 2, C.get(0, 2));
        assert.equal( 6, C.get(1, 0)); assert.equal(3, C.get(1, 1)); assert.equal( 6, C.get(1, 2));
        assert.equal(10, C.get(2, 0)); assert.equal(5, C.get(2, 1)); assert.equal(10, C.get(2, 2));
        assert.equal( 4, C.get(3, 0)); assert.equal(2, C.get(3, 1)); assert.equal( 4, C.get(3, 2));

    });

    it("PI and e", function () {

        const A = new MatrixReef.Matrix([
            [Math.PI, 1], 
            [1, Math.E],
        ]); 
        
        const B = new MatrixReef.Matrix([
            [1],
            [-1]
        ]); 

        const C = A.multiply(B);

        assert.equal(2, C.rows()); 
        assert.equal(1, C.cols()); 

        assert.equal( 2.141592653589793, C.get(0, 0)); 
        assert.equal(-1.718281828459045, C.get(1, 0)); 

    });

    it("one by one", function () {

        const A = new MatrixReef.Matrix([2]); 
        
        const B = new MatrixReef.Matrix([3]); 

        const C = A.multiply(B);

        assert.equal(1, C.rows()); 
        assert.equal(1, C.cols()); 

        assert.equal(6, C.get(0, 0)); 

    });

});

/**
 * This test checks multiplication by using Math JS to generate random expected matrices
 * 
 * Thus, it is assumed that Math JS computes matrix multiplication correctly.
 * 
 */
describe('blind check multiplication', function () {

    const size = 1000;

    this.timeout(size / 2);

    it("generating " + size + " multiplication use cases", function () {
        for (let i = 0; i < size; ++i) {

            const a_rows = Math.round(40 * Math.random()) + 1;
            const a_cols = Math.round(40 * Math.random()) + 1;
            const b_cols = Math.round(40 * Math.random()) + 1;

            const a = testUtils.randomArray(a_rows, a_cols, testUtils.rand50);
            const b = testUtils.randomArray(a_cols, b_cols, testUtils.rand50);

            const A = new MatrixReef.Matrix(a);
            const B = new MatrixReef.Matrix(b);

            const mathjs = MathJS.multiply(a, b);
            const matrixReefJS = A.multiply(B);

            assert.ok(testUtils.compare(matrixReefJS, mathjs, 1e-8));
        }
    });

});