<img src="https://github.com/doleron/matrix-reef.js/blob/master/images/matrix-reef.js-logo.png?raw=true" height="175">

[![Build Status](https://travis-ci.com/doleron/matrix-reef.js.svg?branch=master)](https://travis-ci.com/doleron/matrix-reef.js)
[![Coverage Status](https://coveralls.io/repos/github/doleron/matrix-reef.js/badge.svg?branch=master&service=github)](https://coveralls.io/github/doleron/matrix-reef.js?branch=master)
[![Version](https://img.shields.io/npm/v/matrix-reef.js.svg)](https://www.npmjs.com/package/matrix-reef.js)
[![Maintenance](https://img.shields.io/maintenance/yes/2020.svg)](https://github.com/doleron/matrix-reef.js/graphs/commit-activity)
[![License](https://img.shields.io/github/license/doleron/matrix-reef.js.svg)](https://github.com/doleron/matrix-reef.js/blob/master/LICENSE)

A faster Matrix for the Java Script World.

There are some awesome matrix libraries for Java Script in the wild.
But if you are looking for something faster consider to use this library.

## Benchmarks

Some Matrix multiplication benchmarks using <a href="https://github.com/bestiejs/benchmark.js" target="_blank">Benchmark.js</a>

|                |    2x2    |    3x3    |   4x4   |  16x16 | 32x32 | 256x256 | 512x512 |
|----------------|:---------:|:---------:|:-------:|:------:|:-----:|:-------:|:-------:|
| Matrix-reef JS | 1,787,425 | 1,557,114 | 869,244 | 45,497 | 6,312 |   16.06 |    1.92 |
| ml-Matrix      |   188,606 |   156,872 | 127,508 | 15,417 | 5,319 |   15.76 |    1.89 |
| Math.js        |   129,336 |   101,767 |  63,528 |  3,574 |   553 |    0.92 |    0.08 |

\# of operations per second. See [How to run the benchmarks](#how-to-run-the-benchmarks) for details.

## Disclaimer
Matrix-reef.js is still in its early stages. Some must-to-do features are not available, there is no docs, tutorials and no TypeScript. Thus, I'm afraid that Matrix-reef.js is not ready for production yet.

## How to use

```javascript
const { Matrix } = require('matrix-reef.js');

const A = new Matrix([
    [1, 2], 
    [3, 4], 
    [5, 6]
]); // create a 3x2 matrix

const B = new Matrix([
    [2, 1], 
    [2, 0]
]); // create a 2x2 matrix

const C = A.multiply(B);
```
See [examples](examples/README.md) for a complete list of functionalities and how to use them.
## How to install

### Node.js
```bash
$ npm install matrix-reef.js
```
### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/matrix-reef.js@0.4.1/index.min.js"></script>

```

## Real world example

This [example](examples/ann/training.ann.js) shows how to train a neural network using the [Iris](https://archive.ics.uci.edu/ml/datasets/iris) dataset and only `add`, `multiply`, `dotMultiply` and `transpose`:

```bash
$ node examples/training.ann.js 
```
Should output:
```
Elapsed time: 0.76 secs for 5000 epochs.
```
## How to run the benchmarks

The benchmark code is [here](blob/master/benchmarks/multiplication.benchmark.js).
It compares the matrix-multiplication performance of Matrix-reef.js, [Math.js](https://github.com/josdejong/mathjs) and [ml-Matrix](https://github.com/mljs/matrix).
Execute the following command to run benchmarks yourself:
```bash
node benchmarks/multiplication.benchmark.js 10 4 10 5
```
The command above executes chunks of 10 `4x10` by `10x5` matrix multiplications. Ps.: Use `--max-old-space-size=4096` when running huge matrices.
## New features, bugs and collaboration
Do not hesitate to open a new issue whenever you find something wrong or does not working as expected. Suggestions of new features are pretty welcome as well as collaborations by PR test cases, benchmarks or even new features.