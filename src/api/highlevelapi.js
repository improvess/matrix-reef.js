const lowLevelApi = require('./lowlevelapi');

function _Matrix(data, rows, cols) {

    this.storage = data;
    this.isMatrix = true;
    this._rows = rows;
    this._cols = cols;

    this.add = function(M, result) {
        if (!result) result = _repeat(this._rows, this._cols);
        lowLevelApi.add(this.storage, M.storage, result.storage);
        return result;
    }

    this.subtract = function(M, result) {
        if (!result) result = _repeat(this._rows, this._cols);
        lowLevelApi.subtract(this.storage, M.storage, result.storage);
        return result;
    }

    this.dotMultiply = function(M, result) {
        if (!result) result = _repeat(this._rows, this._cols);
        lowLevelApi.dotMultiply(this.storage, M.storage, result.storage);
        return result;
    }

    this.multiply = function(E, result) {
        if (!result) result = _repeat(this._rows, E._cols);
        lowLevelApi.multiply(this.storage, E.storage, this._rows, this._cols, E._rows, E._cols, result.storage);
        return result;
    }

    this.multiplyByScalar = function(s, result) {
        if (!result) result = _repeat(this._rows, this._cols);
        lowLevelApi.multiplyByScalar(this.storage, s, result.storage);
        return result;
    }

    this.addScalar = function(s, result) {
        if (!result) result = _repeat(this._rows, this._cols);
        lowLevelApi.map(this.storage, function(val) {
            return val + s;
        }, result.storage);
        return result;
    }

    this.addColumn = function(column, result) {
        if (!result) result = _repeat(this._rows, this._cols);
        lowLevelApi.map2d(this.storage, this._rows, this._cols, 
            function(val, i, j) {
                return val + column[i];
            }, result.storage);
        return result;
    }

    this.addRow = function(row, result) {
        if (!result) result = _repeat(this._rows, this._cols);
        lowLevelApi.map2d(this.storage, this._rows, this._cols, 
            function(val, i, j) {
                return val + row[j];
            }, result.storage);
        return result;
    }

    this.map = function(fun, result) {
        if (!result) result = _repeat(this._rows, this._cols);
        lowLevelApi.map(this.storage, fun, result.storage);
        return result;
    }

    this.transpose = function(result) {
        if (!result) result = _repeat(this._cols, this._rows);
        if (result._cols == 1 || result._rows == 1) {
            const rs = result.storage;
            const ts = this.storage;
            for (let i = 0, size = ts.length; i < size; ++i) rs[i] = ts[i];
        } else lowLevelApi.transpose(this.storage, this._rows, this._cols, result.storage);
        return result;
    }

    this.get = function(r, c) {
        return lowLevelApi.get(this.storage, this._rows, this._cols, r, c);
    }

    this.set = function(val, r, c) {
        if (typeof val !== "undefined")
            lowLevelApi.set(this.storage, this._rows, this._cols, r, c, val);
    }

    this.rows = function() {
        return this._rows;
    }

    this.cols = function() {
        return this._cols;
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