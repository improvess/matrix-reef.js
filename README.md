<img src="https://github.com/doleron/matrix-reef.js/blob/master/images/matrix-reef.js-logo.png?raw=true" height="175">

[![Build Status](https://travis-ci.com/doleron/matrix-reef.js.svg?branch=master)](https://travis-ci.com/doleron/matrix-reef.js)
[![Coverage Status](https://coveralls.io/repos/github/doleron/matrix-reef.js/badge.svg?branch=master&service=github)](https://coveralls.io/github/doleron/matrix-reef.js?branch=master)
[![Version](https://img.shields.io/npm/v/matrix-reef.js.svg)](https://www.npmjs.com/package/matrix-reef.js)
[![Maintenance](https://img.shields.io/maintenance/yes/2020.svg)](https://github.com/doleron/matrix-reef.js/graphs/commit-activity)
[![License](https://img.shields.io/github/license/doleron/matrix-reef.js.svg)](https://github.com/doleron/matrix-reef.js/blob/master/LICENSE)

A faster Matrix for the Java Script World.

There are awesome matrix libraries for Java Script in the wild.
But if you are looking for something faster for numeric computing, consider using this library.

## Benchmarks

Some Matrix multiplication benchmarks:

|                |     2x2    |    3x3    |    4x4    |  16x16  |  32x32 | 256x256 | 512x512 | 1024x1024 |
|----------------|:----------:|:---------:|:---------:|:-------:|:------:|:-------:|:-------:|:---------:|
| Matrix-reef JS | 12,525,475 | 7,767,275 | 4,264,070 | 192,831 | 31,382 |   95.34 |   10.25 |      1.73 |
| Alternative M  |    692,706 |   640,598 |   418,942 |  73,875 | 18,161 |   45.08 |    5.40 |      0.69 |
| Alternative S  |  2,704,288 | 1,260,948 |   500,337 |  13,602 |  1,847 |    3.81 |    0.33 |      0.04 |
| Alternative J  |    452,393 |   388,227 |   230,914 |  11,256 |  1,496 |    2.84 |    0.27 |      0.01 |

\# multiplications per second (achieved on V8/node10.19 @ ubuntu 20.04 2 cpus and 8GB RAM on virtualbox). See [Running the benchmarks](#Running-the-benchmarks) for details.

## Disclaimer
Matrix-reef.js is still in its early stages. Some must-to-do features are not available, there is no docs, tutorials and no TypeScript. Thus, I'm afraid that Matrix-reef.js is not ready for production yet.

## How to use

```javascript
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
See [examples](#API-by-examples) below for a full list of functionalities.

## How to install

Matrix-reef.js is a pure Java Script library with no third-party dependencies. 

### Node.js
```bash
$ npm install matrix-reef.js
```
and include
```javascript
const { Matrix } = require('matrix-reef.js');
```
### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/matrix-reef.js@0.4.1/index.min.js"></script>
```
# API by examples
The API is streamline. Check out the examples below:

- **creating**: [constructors](examples/creational.md#constructors), [zeros, ones](examples/creational.md#zeros-and-ones), [identity](examples/creational.md#identity-aka-eye), [diagonal](examples/creational.md#diagonal) matrix from vector, [cloning](examples/creational.md#clone) and slicing.
- **accessing**: [get, set](examples/accessing.md#constructors), row, col, diagonal and path.
- **arithmetics**: [add, subtract](examples/arithmetics.md#get-and-set), [add scalar](examples/arithmetics.md#adding-scalar-to-matrix), [add row](examples/arithmetics.md#adding-row-or-column-to-matrix) to matrix and [add column](examples/arithmetics.md#adding-row-or-column-to-matrix) to matrix.
- **multiplication**: [multiply by scalar](multiplication.md#multiply-by-scalar), [dot multiply](multiplication.md#dot-multiplication) and [matrix multiplication](multiplication.md#matrix-multiplication).
- **functional**: [map](examples/functional.md#map), [max](examples/functional.md#max), [min](examples/functional.md#min), [sum](examples/functional.md#sum), [product](examples/functional.md#product), rowWise, colWise and [chaining](examples/functional.md#chaining) calls.
- **matrices**: [dimension](examples/matrices.md#dimension), [rows, cols](examples/matrices.md#rows-and-cols), [transpose](examples/matrices.md#transpose), determinant, inverse, reshape, flatten, rotate90, rotate180 and rank.
- **query**: comparing, isSquared, isDiagonal, isUpperTriangular and isLowerTriangular.
- **optimization**: [in-place](examples/optimization.md#dimension) operations, views, Matrix2D, Matrix3D, Matrix4D, Vector, RowVector, ColumnVector, Vector2D, Vector3D, Vector4D and Sparse Matrix.
- **machine learning**: convolution, de-convolution, pooling, padding and stribes.
- **miscellaneous**: print out, convert to array and shuffle.

## Real world examples

This [example](examples/ann/training.ann.js) shows how to train a neural network using [Iris](https://archive.ics.uci.edu/ml/datasets/iris) dataset and only `add`, `multiply`, `dotMultiply`, `map` and `transpose`. You can run it by executing the following command:

```bash
$ node examples/training.ann.js 
```
THe output should be like:
```
Elapsed time: 0.81 secs for 5000 epochs.
```
## Running the benchmarks

There are several ways to evaluate a library. Here we are focused on throughput (that is, operations/sec). The code for this benchmark is [here](blob/master/benchmarks/multiplication.js). It uses <a href="https://github.com/bestiejs/benchmark.js" target="_blank">Benchmark.js</a> to compare the performance of Matrix-reef.js and three other Java Script matrix libraries.

To run the benchmark is easy. Just execute the following command to run a benchmark yourself:
```bash
node benchmarks/multiplication.js 10 4 10 5
```
The example above executes chunks of 10 `4x10` by `10x5` matrix multiplications.

## New features, bugs and collaboration
Do not hesitate to open a new issue whenever you find something wrong or does not working as expected. Suggestions of new features are pretty welcome as well as collaborations by PR test cases, benchmarks or even new features.