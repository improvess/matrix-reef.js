# matrix-specific features

## rows and cols

```javascript
const A = new Matrix([
    [1, 2, 3], 
    [4, 5, 6], 
]);

const r = A.rows();
// r is 2
const c = A.cols();
// c is 3

```
## dimension

```javascript
const A = new Matrix([
    [1, 2, 3], 
    [4, 5, 6], 
]);

const dimension = A.dim();
// dimension is [2, 3]

```
