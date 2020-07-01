const Benchmark = require('benchmark');
const testUtils = require('../test/test.utils');

const MatrixReefJS = require('../index');

// Libraries to compare
const MathJS = require('mathjs');
const MLMatrix = require('ml-matrix');
const sylvester = require('sylvester')

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

            const A = new MatrixReefJS.Matrix(a);
            const B = new MatrixReefJS.Matrix(b);

            const mlA = new MLMatrix.Matrix(a);
            const mlB = new MLMatrix.Matrix(b);

            const sylA = sylvester.Matrix.create(a);
            const sylB = sylvester.Matrix.create(b);

            const instance = [a, b, A, B, mlA, mlB, sylA, sylB];

            result[i] = instance;

        }

        return result;
    },

    runBenchmark: function (data) {

        var suite = new Benchmark.Suite;

        const size = data.length;
        suite

            .add('sylvester', function () {
                for (let i = 0; i < size; ++i) {

                    const matrices = data[i];

                    const A = matrices[6];
                    const B = matrices[7];

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
            .add('Matrix-Reef JS', function () {
                for (let i = 0; i < size; ++i) {

                    const matrices = data[i];

                    const A = matrices[2];
                    const B = matrices[3];

                    A.multiply(B);

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
            .run({ 'async': false, initCount : 20, minSamples: 10000,  minTime : 100     });
    }

}