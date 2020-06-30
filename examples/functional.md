# matrix-specific features

## map
Map applies a function f(number) => number to each element of the matrix
```javascript
const A = new Matrix([
    [1, 2, 3], 
    [4, 5, 6], 
]);

const B = A.map(Math.exp);
// B is [ 2.718281828459045,   7.3890560989306,  20.0855369231876], 
//      [54.598150033144236, 148.4131591025766, 403.4287934927351]]
```
## max
max returns an array [maxValue, i, j] where i,j are the index of the first max occurrence.
```javascript
const A = new Matrix([
    [1, 2, 3], 
    [4, 9, 6], 
]);

const result = A.max();
// result is [9, 1, 1]

```
## min
min returns an array [minValue, i, j] where i,j are the index of the first min occurrence.
```javascript
const A = new Matrix([
    [1, 2, 0], 
    [4, 9, 6], 
]);

const result = A.min();
// result is [0, 0, 2]

```
## sum

```javascript
const A = new Matrix([
    [1, 2, 3], 
    [4, 5, 6], 
]);

const s = A.sum();
// s is the sum of all elements, that is 21

```
## product
```javascript
const A = new Matrix([
    [1, 2, 3], 
    [4, 5, 6], 
]);

const p = A.product();
// p is the product of all elements, that is 720
```
## chaining
```javascript
const A = new Matrix([
    [1, 2], 
    [3, 4], 
    [5, 6]
]); 
const B = new Matrix([
    [2, 1], 
    [2, 0]
]);
const C = new Matrix([
    [2, 2], 
    [3, 3], 
    [4, 4]
]); 

const D = A.multiply(B).add(C);
// D is [[8, 3 ], [17, 6], [26, 9]]
```
