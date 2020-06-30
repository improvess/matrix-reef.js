# Matrix arithmetics

## adding and subtracting

```javascript

const A = new Matrix([
    [1, 2, 3], 
    [4, 5, 6], 
]);

const B = new Matrix([
    [2, 1, 0], 
    [2, 0, 2]
]);

const C = A.add(B);

const D = A.subtract(B);

```
## adding scalar to matrix

```javascript
const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
const C = A.addScalar(7);
//C is [[8, 11], [9, 12], [10, 13]]

const D = A.addScalar(-3);
//D is [[-2, 1], [-1, 2], [0, 3]]

//using inplace
const E = zeros(3, 2);
A.addScalar(-3, E);
//E is [[-2, 1], [-1, 2], [0, 3]];
```
## adding row or column to matrix

```javascript
//adding a column
const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
const C = A.addColumn([1, 2, 3]);
//C is [[2, 5], [4, 7], [6, 9]]

//adding a row
const A = new Matrix([[1, 4], [2, 5], [3, 6]]);
const D = A.addRow([2, -1]);
//D is [[3, 3], [4, 4], [5, 5]]
```