# Multiplication on matrices

## multiply by scalar

Each element is multiplied by the same scalar.

```javascript
const A = new Matrix([
    [1, 2, 3], 
    [4, 5, 6], 
]);

const B = A.multiplyByScalar(2.5);
// val is 6

let val = B.get(1, 0);
// now val is 10

```
## dot multiplication

Each element is multiplied by the respective element in the other matrix. The size of both matrices must match.

```javascript
const A = new Matrix([
    [1, 2, 3], 
    [4, 5, 6], 
]);
const B = new Matrix([
    [2, 1, 4], 
    [3, -1, 2], 
]);

const C = A.dotMultiply(B);
// C is [[2, 2, 12], [12, -5, 12]]
```
## matrix multiplication

Check out this link you have questions about what is matrix multiplication: <a href="https://en.wikipedia.org/wiki/Matrix_multiplication" target="_blank">https://en.wikipedia.org/wiki/Matrix_multiplication</a>

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

const C = A.multiply(B);
// C is [[6, 1 ], [14, 3 ], [22, 5 ]]
```