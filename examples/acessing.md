# reading and writing Matrix data

## get and set

```javascript
// creates a 2x3 matrix
const A = new Matrix([
    [1, 2, 3], 
    [4, 5, 6], 
]);

let val = A.get(1, 2);
//val is 6

A.set(12, 1, 2);

val = A.get(1, 2);
//now val is 12

```
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
