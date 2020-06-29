const rawdata = require('./iris.dataset').dataset;
const {Matrix, Vector, zeros} = require('../../index');

let weight1 = new Matrix([
    0.0242525172953017, -0.0305390009971664, 0.03355062157463565, -0.019746308149674242,
    0.022662858742601488, 0.03201780630162036, 0.02401299820526416, -0.018754663650378568,
    -0.031117935463524673, 0.04259685106621908, 0.02133110393823469, 0.04388816188910931
], 3, 4);
let weight2 =  new Matrix([0.027023429587306844, 0.047737802038675406, -8.617050637471438E-4 ,
    0.004644222421406531, -0.017963170264953733, -0.029948356201707205 ,
    -0.03513942801283209, -0.02923590167358281, -0.012147148731891946 ], 3, 3);

let bias1 = new Matrix([0.021914050730164863, 0.01390399970937567, -0.016249285177650778], 3, 1);
let bias2 = new Matrix([-0.0491382673800735, -0.001813155428890656, -0.015015642691489917], 3, 1);


let dataset = new Array(rawdata.length);

const datasetSize = dataset.length;

for (let i = 0; i < datasetSize; ++i) {
    const rawInstance = rawdata[i];

    const instance = new Object();
    instance.x = new Matrix(rawInstance.x, rawInstance.x.length, 1);
    instance.y = new Matrix(rawInstance.y, rawInstance.y.length, 1);

    dataset[i] = instance;
}

const EPOCHS = 5000;
const LEARNING_RATE = 0.3;

const y1 = zeros(3, 1);
const y2 = zeros(3, 1);
const z1 = zeros(3, 1);
const z2 = zeros(3, 1);
const y1_deriv = zeros(3, 1);
const y2_deriv = zeros(3, 1);
const errorGrad1 = zeros(3, 1);
const errorGrad2 = zeros(3, 1);
const dW1 = zeros(3, 4);
const delta1 = zeros(3, 4);
const deltaB1 = zeros(3, 1);
const delta2 = zeros(3, 3);
const deltaB2 = zeros(3, 1);

const grad1 = zeros(3, 1);
const grad1_t = zeros(1, 3);
const grad2 = zeros(3, 1);
const grad2_t = zeros(1, 3);

const dW2 = zeros(3, 3);

const hrstart = process.hrtime();

train(dataset, EPOCHS, LEARNING_RATE);

const hrend = process.hrtime(hrstart);

const duration = (Math.round(hrend[0] * 100 + hrend[1] / 10000000) / 100).toFixed(2);

console.info('Elapsed time: %s secs for %d epochs.', duration, EPOCHS);

function train(dataset, epochs, learningRate) {

    for (let epoch = 0; epoch < epochs; epoch++) {

        for (let instanceIndex = 0; instanceIndex < datasetSize; ++instanceIndex) {
            const instance = dataset[instanceIndex];
            const input = instance.x;
            const expectedOutput = instance.y;

            // forward
            weight1.multiply(input, z1);
            z1.add(bias1, z1);
            z1.map(_LogisticSigmoid, y1);

            weight2.multiply(y1, z2);
            z2.add(bias2, z2);
            z2.map(_LogisticSigmoid, y2);

            // error propagation
            expectedOutput.subtract(y2, errorGrad2);
            y2.map(_LogisticSigmoid_derivative, y2_deriv);
            y2_deriv.dotMultiply(errorGrad2, grad2);
            grad2.transpose(grad2_t);
            y1.multiply(grad2_t, dW2);

            grad2_t.multiply(weight2, errorGrad1);
            y1.map(_LogisticSigmoid_derivative, y1_deriv);
            y1_deriv.dotMultiply(errorGrad1, grad1);
            grad1.transpose(grad1_t);
            input.multiply(grad1_t, dW1); 

            dW1.multiplyByScalar(learningRate, delta1);
            dW2.multiplyByScalar(learningRate, delta2);
            grad1.multiplyByScalar(learningRate, deltaB1);
            grad2.multiplyByScalar(learningRate, deltaB2);

            // network update

            weight1.add(delta1, weight1);
            weight2.add(delta2, weight2);
            bias1.add(deltaB1, bias1);
            bias2.add(deltaB2, bias2);

        }

    }

}

function _LogisticSigmoid (z) {
    if (z < -45.) return 0;
    if (z > 45.) return 1;
    return 1.0 / (1 + Math.exp(-z));
}

function _LogisticSigmoid_derivative (y) {
    return y * (1 - y);
}
