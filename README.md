[![Build Status](https://travis-ci.com/doleron/matrix-reef.js.svg?branch=master)](https://travis-ci.com/doleron/matrix-reef.js)
[![Coverage Status](https://coveralls.io/repos/github/doleron/matrix-reef.js/badge.svg?branch=master&service=github)](https://coveralls.io/github/doleron/matrix-reef.js?branch=master)

# matrix-reef.js
Fast Matrix Library for Java Script

## Benchmarks

Some [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication) benchmarks using [Benchmark.js](https://github.com/bestiejs/benchmark.js):

|                                                   |     2x2     |     3x3     |     4x4     |    16x16    |    32x32    |   512x512   |  1024x1024  |
|-------------|-------------|-------------|-------------|-------------|-------------|-------------|-------------|
|[Matrix-reef.js](https://github.com/doleron/matrix-reef.js)    |    24,624   |   21,900     |   15,394    |   1,799    |    265     |    0.08    |    0.01     |
|[ml-Matrix](https://github.com/mljs/matrix)        |     8,606   |   6,205       |  4,112     |    1,003   |    217    |   0.08     |     0.01        |
|[Math.js](https://github.com/josdejong/mathjs)     |    5,560   |   3,830      |    2,913     |    146     |     20  |    timeout   |   timeout   |

The values represent the number of operations per second obtained from chunks of 100 multiplications of squared random `n x n` matrices

## How to install

### Node.js
Run the command:
```bash
$ npm install matrix-reef.js
```

### CDN
Put it somewhere in your html:
```html
<script src="https://cdn.jsdelivr.net/npm/matrix-reef.js/index.min.js"></script>

```
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
## Real world example

This [example](https://github.com/doleron/matrix-k/blob/master/example/training.ann.js) shows how to train a neural network using the [Iris](https://archive.ics.uci.edu/ml/datasets/iris) dataset and only `add`, `multiply`, `dotMultiply` and `transpose`:

```bash
$ node examples/training.ann.js 
```
Should output:
```
Elapsed time: 0.76 secs for 5000 epochs.
```

## How to run the benchmarks

The benchmark code is [here](https://github.com/doleron/matrix-reef.js/blob/master/benchmarks/multiplication.benchmark.js).
Run:
```bash
node benchmarks/multiplication.benchmark.js 10 4 10 5
```
for benchmark chunks of 10 `4x10` by `10x5` matrix multiplications. Use `--max-old-space-size=4096` when running huge matrices. 
