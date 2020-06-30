# Optimization techniques

## in-place operations

Memory allocation is a key factor of performance in any computer program

- memory takes time to be allocate by browser/virtual machine/operational system
- memory must be de-allocated (in javascript it is done by garbage collector, which consumes more processing time)

For the reasons above, usually when we are running computer intensive algorithms it is a good practice to pre allocated required objects and reuse them as much as possible.

Reuse pre-allocated matrices is easy in Matrix-reef.js. Consider the example bellow:

```javascript
const A = new Matrix([
    [1, 2, 3], 
    [4, 5, 6], 
]);

const B = new Matrix([
    [2, 1], 
    [2, 0]
]);

let C = zeros(2, 2);
let D = zeros(2, 2);

for (let i = 0; i < 1000; ++i) {
    A.multiply(B, C);
    D.add(C, D);
}
// use D here
```
In terms of memory and CPU usage, the previous code is way better than
```javascript
// define A and B
let D = zeros(2, 2);
for (let i = 0; i < 1000; ++i) {
    const C = A.multiply(B); // new instance for each run
    D = D.add(C); // new instance for each run
}
// use D here
```
This approach is exemplified in the [neural network](add/training.ann.js) use case.

It is noteworthy that in-place chains are also allowed:
```javascript
// define A, B, C and D
for (let i = 0; i < 1000; ++i) {
    D.add(A.multiply(B, C), D);
}
// use D here
```