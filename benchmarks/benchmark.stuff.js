const MatrixK = require('../index');
const MathJS = require('mathjs');
const MLMatrix = require('ml-matrix');
const Benchmark = require('benchmark');
const testUtils = require('../test/test.utils');

module.exports = {

    generateData: function (amount, sideGen) {

        const result = new Array(amount);

        for (let i = 0; i < amount; ++i) {

            const dims = sideGen();

            const a_rows = dims[0];
            const a_cols = dims[1];
            const b_cols = dims[2];

            const a = testUtils.randomArray(a_rows, a_cols, testUtils.rand50);
            const b = testUtils.randomArray(a_cols, b_cols, testUtils.rand50);

            const A = new MatrixK.Matrix(a);
            const B = new MatrixK.Matrix(b);

            const mlA = new MLMatrix.Matrix(a);
            const mlB = new MLMatrix.Matrix(b);

            const instance = [a, b, A, B, mlA, mlB];

            result[i] = instance;

        }

        return result;
    },

    runBenchmark: function (data) {

        var suite = new Benchmark.Suite;

        const size = data.length;
        suite

            .add('Matrix-Reef JS', function () {
                for (let i = 0; i < size; ++i) {

                    const matrices = data[i];

                    const A = matrices[2];
                    const B = matrices[3];

                    A.multiply(B);

                }
            })
            .add('ml-Matrix', function () {
                for (let i = 0; i < size; ++i) {

                    const matrices = data[i];

                    const A = matrices[4];
                    const B = matrices[5];

                    A.mmul(B);

                }
            })
            .add('MathJS', function () {
                for (let i = 0; i < size; ++i) {

                    const matrices = data[i];

                    const A = matrices[0];
                    const B = matrices[1];

                    MathJS.multiply(A, B);

                }
            })
            .on('cycle', function (event) {
                console.log(String(event.target));
            })
            .on('complete', function () {
                console.log('Fastest is ' + this.filter('fastest').map('name'));
            })
            .run({ 'async': true });
    }

}