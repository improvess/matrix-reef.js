const assert = require('assert');

const MatrixReef = require('../../index');
const MathJS = require('mathjs');
const testUtils = require('../test.utils');

/**
 * This test compare multiplication by using Math JS to generate random expected matrices
 * 
 * This assumes Math JS computes A x B matrix multiplication correctly.
 * 
 */
describe('blind check multiplication', function () {

    const size = 100000;

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