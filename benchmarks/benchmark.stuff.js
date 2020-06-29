const MatrixK = require('../index');
const MathJS = require('mathjs');
const MLMatrix = require('ml-matrix');
const Benchmark = require('benchmark');

module.exports = {

    populate: function (a_rows, a_cols, b_cols, generator) {

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
    },

    generateData: function (amount, sideGen) {

        const result = new Array(amount);

        for (let i = 0; i < amount; ++i) {

            const dims = sideGen();

            const a_rows = dims[0];
            const a_cols = dims[1];
            const b_cols = dims[2];

            const matrices = module.exports.populate(a_rows, a_cols, b_cols, function (i, j) {
                return Math.round(10000 * Math.random()) / 100 - 50.0;
            });

            const a2d = matrices[0];
            const a1d = matrices[1];
            const b2d = matrices[2];
            const b1d = matrices[3];

            const matixRJS_A = new MatrixK.Matrix(a1d, a_rows, a_cols);
            const matixRJS_B = new MatrixK.Matrix(b1d, a_cols, b_cols);

            const mlMatix_A = new MLMatrix.Matrix(a2d);
            const mlMatix_B = new MLMatrix.Matrix(b2d);

            const instance = [a2d, b2d, matixRJS_A, matixRJS_B, mlMatix_A, mlMatix_B];

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