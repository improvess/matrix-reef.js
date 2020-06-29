const assert = require('assert');
const { Matrix } = require('../../../index');

function _LogisticSigmoid (z) {
    if (z < -45.) return 0;
    if (z > 45.) return 1;
    return 1.0 / (1 + Math.exp(-z));
}

function _LogisticSigmoid_derivative (y) {
    return y * (1 - y);
}

/**
 * This test trains a 4-3-3 neural networks using a single instance drawn from Iris dataset during 1 epoch
 * 
 */
describe('training ann for 1 epoch and 1 instance', function () {

    let weight1 = new Matrix([
        [0.0242525172953017, -0.0305390009971664, 0.03355062157463565, -0.019746308149674242],
        [0.022662858742601488, 0.03201780630162036, 0.02401299820526416, -0.018754663650378568],
        [-0.031117935463524673, 0.04259685106621908, 0.02133110393823469, 0.04388816188910931]
    ]);

    let weight2 = new Matrix([
        [0.027023429587306844, 0.047737802038675406, -8.617050637471438E-4],
        [0.004644222421406531, -0.017963170264953733, -0.029948356201707205],
        [-0.03513942801283209, -0.02923590167358281, -0.012147148731891946]
    ]);

    let bias1 = new Matrix([0.021914050730164863, 0.01390399970937567, -0.016249285177650778], 3, 1);
    let bias2 = new Matrix([-0.0491382673800735, -0.001813155428890656, -0.015015642691489917], 3, 1);

    const learningRate = 0.3;

    const input = new Matrix([5, 3.5, 1.6, 0.6], 4, 1);
    const expectedOutput = new Matrix([1, 0, 0], 3, 1);

    // forward
    let z1 = weight1.multiply(input);
    z1 = z1.add(bias1);
    let y1 = z1.map(_LogisticSigmoid);

    let z2 = weight2.multiply(y1);
    z2 = z2.add(bias2);
    let y2 = z2.map(_LogisticSigmoid);

    let y2_0 = y2.get(0, 0);

    it('y2 should be equal', function () {
        assert.ok(Math.abs(y2_0 - 0.497873045758914) < 1e-8);   
    });

    // error propagation
    let errorGrad2 = expectedOutput.subtract(y2);
    let y2_deriv = y2.map(_LogisticSigmoid_derivative);
    let grad2 = y2_deriv.dotMultiply(errorGrad2);
    let grad2_t = grad2.transpose();
    let dW2 = y1.multiply(grad2_t);

    let dW2_0 = dW2.get(0, 0);
    it('dW2 should be equal', function () {
        assert.ok(Math.abs(dW2_0 - 0.0652151827141934) < 1e-8);   
    });

    let errorGrad1 = grad2_t.multiply(weight2);
    let y1_deriv = y1.map(_LogisticSigmoid_derivative);
    let grad1 = y1_deriv.dotMultiply(errorGrad1);
    let grad1_t = grad1.transpose();
    let dW1 = input.multiply(grad1_t);

    let dW1_00 = dW1.get(0, 0);
    it('dW1 should be equal', function () {
        assert.ok(Math.abs(dW1_00 - 0.008842875242577512) < 1e-8);   
    });

    let delta1 = dW1.multiplyByScalar(learningRate);
    let delta2 = dW2.multiplyByScalar(learningRate);
    let deltaB1 = grad1.multiplyByScalar(learningRate);
    let deltaB2 = grad2.multiplyByScalar(learningRate);

    // network update

    weight1 = weight1.add(delta1);
    weight2 = weight2.add(delta2);
    bias1 = bias1.add(deltaB1);
    bias2 = bias2.add(deltaB2);

    const w1_00 = weight1.get(0, 0);
    const w2_00 = weight2.get(0, 0);

    it('w2 should be equal', function () {
        assert.ok(Math.abs(w2_00 - 0.046587984401564864) < 1e-8);   
    });

    it('w1 should be equal', function () {
        assert.ok(Math.abs(w1_00 - 0.026905379868074956) < 1e-8);     
    });

});

