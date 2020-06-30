# Creational examples and features
## constructors

```javascript
// creates a 2x3 matrix
const A = new Matrix([
    [1, 2, 3], 
    [4, 5, 6], 
]);

// creates a 2x3 matrix
const B = new Matrix([1, 2, 3, 4, 5, 6], 2, 3);

// creates a 3x2 matrix
const B = new Matrix([1, 2, 3, 4, 5, 6], 3, 2);

// creates an 1x6 matrix
const B = new Matrix([1, 2, 3, 4, 5, 6], 1, 6);
```
## zeros and ones
```javascript
// results [[0, 0, 0, 0], [0, 0, 0, 0]];
const matrix = zeros(2, 4);

// results [[1], [1], [1]];
const matrix = zeros(3, 1);
```
## identity (aka eye)

```javascript
// [[0, 0, 0], [0, 1, 0], [0, 0, 1]];
const matrix = identity(3);
```
## clone
Make a full copy of source matrix
```javascript
const A = new Matrix([
    [1, 2, 3], 
    [4, 5, 6], 
]);
const B = A.clone();
```
## diagonal
Creates a diagonal matrix using 1D array
```javascript
const v = new Matrix([-1, 4, 2]);
const B = diagonal(v);
// B is [[-1, 0, 0], [0, 4, 0], [0, 0, 2]];

```