
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

// creates a 1x6 matrix
const B = new Matrix([1, 2, 3, 4, 5, 6], 1, 6);
```

## zeros and ones

```javascript
// [[0, 0, 0, 0], [0, 0, 0, 0]];
const matrix = zeros(2, 4);

// [[1], [1], [1]];
const matrix = zeros(3, 1);
```

## identity (aka eye)

```javascript
// [[0, 0, 0], [0, 1, 0], [0, 0, 1]];
const matrix = identity(3);

```