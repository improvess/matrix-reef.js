const MatrixReefJS = require('../index');
const MathJS = require('mathjs');
const MLMatrix = require('ml-matrix');
const Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

let samplingSize = process.argv[2];
let rows = process.argv[3];
let cols = process.argv[4];

const maxSide = 1024;
const maxSize = 100000;

if(!isNaN(samplingSize)) {
    samplingSize = parseInt(samplingSize);
    if(samplingSize <= 0 || samplingSize > maxSize) throw new Error("Illegal sampling size: " + samplingSize + ". Must be > 0 and <= " + maxSize);
} else {
    samplingSize = Math.round(maxSize * Math.random()) + 1;
    console.log("number of samplings not provided or recognized as an integer. Using a random generated one: " + samplingSize);
}

if(!isNaN(rows)) {
    rows = parseInt(rows);
    if(rows <= 0 || rows > maxSide) throw new Error("Illegal rows size: " + rows + ". Must be > 0 and <= " + maxSide);
} else {
    rows = Math.round(maxSide * Math.random()) + 1;
    console.log("number of rows not provided or recognized as an integer. Using a random generated one: " + rows);
}

if(!isNaN(cols)) {
    cols = parseInt(cols);
    if(cols <= 0 || cols > maxSide) throw new Error("Illegal cols size: " + cols + ". Must be > 0 and <= " + maxSide);
} else {
    cols = Math.round(maxSide * Math.random()) + 1;
    console.log("number of cols not provided or recognized as an integer. Using a random generated one: " + cols);
}
const array = new Array(rows);

for (let i = 0; i < rows; ++i) {
    const row = new Array(cols);
    array[i] = row;
    for (let j = 0; j < cols; ++j) {
        row[j] = Math.PI; // any number
    }
}

suite.add('Matrix Reef JS', function() {
    for (let i = 0; i < samplingSize; ++i) {
        new MatrixReefJS.Matrix(array);
    }
})
.add('ml-Matrix', function() {
    for (let i = 0; i < samplingSize; ++i) {
        new MLMatrix.Matrix(array);
    }
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });