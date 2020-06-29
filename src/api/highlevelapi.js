const lowLevelApi = require('./lowlevelapi');

function _Matrix(data, rows, cols) {

    this.storage = data;
    this.isMatrix = true;
    this.rows = rows;
    this.cols = cols;

    this.add = function(M, result) {
        if (!result) result = _repeat(this.rows, this.cols);
        lowLevelApi.add(this.storage, M.storage, result.storage);
        return result;
    }

    this.subtract = function(M, result) {
        if (!result) result = _repeat(this.rows, this.cols);
        lowLevelApi.subtract(this.storage, M.storage, result.storage);
        return result;
    }

    this.dotMultiply = function(M, result) {
        if (!result) result = _repeat(this.rows, this.cols);
        lowLevelApi.dotMultiply(this.storage, M.storage, result.storage);
        return result;
    }

    this.multiply = function(E, result) {
        if (!result) result = _repeat(this.rows, E.cols);
        lowLevelApi.multiply(this.storage, E.storage, this.rows, this.cols, E.rows, E.cols, result.storage);
        return result;
    }

    this.multiplyByScalar = function(s, result) {
        if (!result) result = _repeat(this.rows, this.cols);
        lowLevelApi.multiplyByScalar(this.storage, s, result.storage);
        return result;
    }

    this.addScalar = function(s, result) {
        if (!result) result = _repeat(this.rows, this.cols);
        lowLevelApi.map(this.storage, function(val) {
            return val + s;
        }, result.storage);
        return result;
    }

    this.addColumn = function(column, result) {
        if (!result) result = _repeat(this.rows, this.cols);
        lowLevelApi.map2d(this.storage, this.rows, this.cols, 
            function(val, i, j) {
                return val + column[i];
            }, result.storage);
        return result;
    }

    this.addRow = function(row, result) {
        if (!result) result = _repeat(this.rows, this.cols);
        lowLevelApi.map2d(this.storage, this.rows, this.cols, 
            function(val, i, j) {
                return val + row[j];
            }, result.storage);
        return result;
    }

    this.map = function(fun, result) {
        if (!result) result = _repeat(this.rows, this.cols);
        lowLevelApi.map(this.storage, fun, result.storage);
        return result;
    }

    this.transpose = function(result) {
        if (!result) result = _repeat(this.cols, this.rows);
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

    this.set = function(val, r, c) {
        if (typeof val !== "undefined")
            lowLevelApi.set(this.storage, this.rows, this.cols, r, c, val);
    }

}

function _repeat(rows, cols, value) {
    const size = rows * cols;
    if (!value) value = 0;
    return new _Matrix(lowLevelApi.repeat(value, size), rows, cols);
}

module.exports = {

    Matrix : function(data, rows, cols) {
        const init = lowLevelApi.initStorage(data, rows, cols);
        _Matrix.call(this, init[0], init[1], init[2]);
    },

    zeros : function(size, cols) {
        if (cols) {
            return _repeat(size, cols);
        } else {
            return _repeat(size, 1);
        }
    },

    ones : function(size, cols) {
        if (cols) {
            return _repeat(size, cols, 1.);
        } else {
            return _repeat(size, 1, 1.);
        }
    },

    identity : function(size) {
        const storage = lowLevelApi.identity(size);
        return new _Matrix(storage, size, size);
    }

}