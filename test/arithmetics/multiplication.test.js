const assert = require('assert');

const MatrixK = require('../../index');
const MathJS = require('mathjs');

function populate(a_rows, a_cols, b_cols, generator) {

    const a2d = [];
    const a1d = [];

    for (let i = 0; i < a_rows; ++i) {
        const row = [];
        a2d[i] = row;
        const index_home = i * a_cols;
        for (let j = 0; j < a_cols; ++j) {
            const val = generator(i, j);
            row[j] = val;
            a1d[index_home + j] = val;
        }
    }

    const b2d = [];
    const b1d = [];

    for (let i = 0; i < a_cols; ++i) {
        const row = [];
        b2d[i] = row;
        const index_home = i * b_cols;
        for (let j = 0; j < b_cols; ++j) {
            const val = generator(i, j);
            row[j] = val;
            b1d[index_home + j] = val;
        }
    }
    return [a2d, a1d, b2d, b1d];
}

function compare(A, B, precision) {

    const rows = A.length;
    const cols = A[0].length;
    const size = rows * cols;

    if (size != B.length) assert.fail("Wrong B size: " + B.length);

    for (let i = 0; i < rows; ++i) {
        const row = A[i];
        const index_home = i * cols;
        for (let j = 0; j < cols; ++j) {
            const a = row[j];
            const b = B[index_home + j];
            if (Math.abs(a - b) > precision) return false;
        }
    }
    return true;
}

/**
 * This test compare multiplication by using Math JS to generate random expected matrices
 * 
 * This assumes Math JS computes A x B matrix multiplication correctly.
 * 
 */
describe('blind check multiplication', function () {

    const size = 1000;

    //this.timeout(size / 2);

    it("generating " + size + " multiplication use cases", function () {
        for (let i = 0; i < size; ++i) {

            const a_rows = Math.round(40 * Math.random()) + 1;
            const a_cols = Math.round(40 * Math.random()) + 1;
            const b_cols = Math.round(40 * Math.random()) + 1;

            const matrices = populate(a_rows, a_cols, b_cols, function (i, j) {
                return Math.round(10000 * Math.random()) / 100 - 50.0;
            });

            const a2d = matrices[0];
            const a1d = matrices[1];
            const b2d = matrices[2];
            const b1d = matrices[3];

            const mathJS_Result = MathJS.multiply(a2d, b2d);

            const matixK_A = new MatrixK.Matrix(a1d, a_rows, a_cols);
            const matixK_B = new MatrixK.Matrix(b1d, a_cols, b_cols);

            const matrixK_Result = matixK_A.multiply(matixK_B);

            assert.ok(compare(mathJS_Result, matrixK_Result.storage, 1e-8));
        }
    }
    );

});