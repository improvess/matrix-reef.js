const benchmarkStuff = require('./benchmark.stuff');
const utils = require('util');

let samplingSize = process.argv[2];
let aRows = process.argv[3];
let aCols = process.argv[4];
let bCols = process.argv[5];

const maxSide = 1024;
const maxSize = 100000;

if(!isNaN(samplingSize)) {
    samplingSize = parseInt(samplingSize);
    if(samplingSize <= 0 || samplingSize > maxSize) throw new Error("Illegal sampling size: " + samplingSize + ". Must be > 0 and <= " + maxSize);
} else {
    samplingSize = Math.round(maxSize * Math.random()) + 1;
    console.log("number of samplings not provided or recognized as an integer. Using a random generated one: " + samplingSize);
}

if(!isNaN(aRows)) {
    aRows = parseInt(aRows);
    if(aRows <= 0 || aRows > maxSide) throw new Error("Illegal A rows size: " + aRows + ". Must be > 0 and <= " + maxSide);
} else {
    console.log("number of A rows not provided or recognized as an integer. Using a random generated one.");
    aRows = Math.round(maxSide * Math.random()) + 1;
}

if(!isNaN(aCols)) {
    aCols = parseInt(aCols);
    if(aCols <= 0 || aCols > maxSide) throw new Error("Illegal A cols size: " + aCols + ". Must be > 0 and <= " + maxSide);
} else {
    console.log("number of A cols not provided or recognized as an integer. Using a random generated one.");
    aCols = Math.round(maxSide * Math.random()) + 1;
}

if(!isNaN(bCols)) {
    bCols = parseInt(bCols);
    if(bCols <= 0 || bCols > maxSide) throw new Error("Illegal B cols size: " + bCols + ". Must be > 0 and <= " + maxSide);
} else {
    console.log("number of B cols not provided or recognized as an integer. Using a random generated one.");
    bCols = Math.round(maxSide * Math.random()) + 1;
}

console.log(utils.format("benchmarking %d eras multiplying matrices %dx%d by %dx%d", samplingSize, aRows, aCols, aCols, bCols));

const testData = benchmarkStuff.generateData(samplingSize, function(){
    return [aRows, aCols, bCols];
});

benchmarkStuff.runBenchmark(testData);
