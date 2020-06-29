const lowLevelApi = require('./lowlevelapi');

function _Matrix(data, rows, cols) {

    this.storage = data;
    this.isMatrix = true;
    this.rows = rows;
    this.cols = cols;

    this.add = function(M, result) {
        if (!result) result = _zerosMatrix(this.rows, this.cols);
        lowLevelApi.add(this.storage, M.storage, result.storage);
        return result;
    }

    this.subtract = function(M, result) {
        if (!result) result = _zerosMatrix(this.rows, this.cols);
        lowLevelApi.subtract(this.storage, M.storage, result.storage);
        return result;
    }

    this.dotMultiply = function(M, result) {
        if (!result) result = _zerosMatrix(this.rows, this.cols);
        lowLevelApi.dotMultiply(this.storage, M.storage, result.storage);
        return result;
    }

    this.multiply = function(E, result) {
        if (!result) result = _zerosMatrix(this.rows, E.cols);
        lowLevelApi.multiply(this.storage, E.storage, this.rows, this.cols, E.rows, E.cols, result.storage);
        return result;
    }

    this.multiplyByScalar = function(s, result) {
        if (!result) result = _zerosMatrix(this.rows, this.cols);
        lowLevelApi.multiplyByScalar(this.storage, s, result.storage);
        return result;
    }

    this.map = function(fun, result) {
        if (!result) result = _zerosMatrix(this.rows, this.cols);
        lowLevelApi.map(this.storage, fun, result.storage);
        return result;
    }

    this.transpose = function(result) {
        if (!result) result = _zerosMatrix(this.cols, this.rows);
        if (result.cols == 1 || result.rows == 1) {
            const rs = result.storage;
            const ts = this.storage;
            for (let i = 0, size = ts.length; i < size; ++i) rs[i] = ts[i];
        } else lowLevelApi.transpose(this.storage, this.rows, this.cols, result.storage);
        return result;
    }

    this.get = function(r, c) {
        return lowLevelApi.get(this.storage, this.rows, this.cols, r, c);
    }

}

function _zerosMatrix(rows, cols) {
    const size = rows * cols;
    return new _Matrix(lowLevelApi.repeat(0., size), rows, cols);
}

module.exports = {

    Matrix : function(data, rows, cols) {
        const init = lowLevelApi.initStorage(data, rows, cols);
        _Matrix.call(this, init[0], init[1], init[2]);
    },

    zeros : function(size, cols) {
        if (cols) {
            return _zerosMatrix(size, cols);
        } else {
            return _zerosMatrix(size, 1);
        }
    }

}