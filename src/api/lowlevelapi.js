
function _allocate(size) {
    return new Array(size);
}

module.exports = {

    repeat: function (value, times) {
        if (times <= 0) throw new Error("illegal times to repeat " + times);
        let result = _allocate(times);
        for (let i = 0; i < times; ++i) {
            result[i] = value;
        }
        return result;
    },

    identity: function (size) {
        if (typeof size === "undefined") throw new Error("size not defined");
        if (size <= 0) throw new Error("illegal negative size " + size);
        const totalSize = size * size;
        let result = _allocate(totalSize);
        let _diag = 0;
        for (let i = 0; i < totalSize; ++i) {
            if (i == _diag) {
                result[i] = 1.0;
                _diag += size + 1;
            } else result[i] = 0.0;
        }
        return result;
    },

    add: function (a, b, restore) {
        let aRows = a.length;
        let bRows = b.length;

        if (aRows != bRows) {
            throw new Error("It is not possible to add array size " + aRows +
                " to array size " + bRows);
        }

        let result = restore;
        for (let r = 0; r < aRows; ++r) {
            result[r] = a[r] + b[r];
        }
    },

    map: function (list, fun, restore) {
        const size = list.length;
        let result = restore;
        for (let i = 0; i < size; ++i) {
            result[i] = fun(list[i], i);
        }
        return result;
    },

    map2d: function (list, rows, cols, fun, restore) {
        const size = list.length;
        let result = restore;
        for (let i = 0; i < size; ++i) {
            const i_cols = i * cols;
            for (let j = 0; j < size; ++j) {
                const index = i_cols + j;
                result[index] = fun(list[index], i, j);
            }
        }
        return result;
    },

    transpose: function (a, rows, cols, restore) {
        for (let r = 0; r < rows; ++r) {
            const rCols = r * cols;
            for (let c = 0; c < cols; ++c) {
                const aIndex = rCols + c;
                const rIndex = c * rows + r;
                restore[rIndex] = a[aIndex];
            }
        }
    },

    subtract: function (a, b, restore) {
        let aRows = a.length;
        let bRows = b.length;

        if (aRows != bRows) {
            throw new Error("It is not possible to subtract array size " + aRows +
                " to array size " + bRows);
        }

        let result = restore;
        for (var r = 0; r < aRows; ++r) {
            result[r] = a[r] - b[r];
        }
    },

    multiplyByScalar: function (a, b, restore) {
        let aRows = a.length;
        let result = restore;
        for (var r = 0; r < aRows; ++r) {
            let val = a[r] * b;
            result[r] = val;
        }
    },

    dotMultiply: function (a, b, restore) {
        let aRows = a.length;
        let bRows = b.length;

        if (aRows != bRows) {
            throw new Error("It is not possible to dot multiply array size " + aRows +
                " by array size " + bRows);
        }

        let result = restore;
        for (var r = 0; r < aRows; ++r) {
            result[r] = a[r] * b[r];
        }
    },

    multiply: function (a, b, aRows, aCols, bRows, bCols, result) {
        if (aCols != bRows) throw new Error("Incompatible matrices to multiply");

        let bColumn = (bCols > 1) ? new Array(aCols) : b;
        for (let c = 0; c < bCols; ++c) {
            if (bCols > 1) {
                for (let br = 0; br < aCols; ++br) {
                    bColumn[br] = b[br * bCols + c];
                }
            } 
            for (let r = 0; r < aRows; ++r) {
                let sum = 0;
                const r_aCols = r * aCols;
                for (let br = 0; br < aCols; ++br) {
                    sum += a[r_aCols + br] * bColumn[br];
                }
                result[r * bCols + c] = sum;
            }
        }
        return result;
    },

    initStorageFromRaw: function (data) {
        const rows = data.length;
        const cols = (data[0]) ? data[0].length : undefined;
        for (let i = 0; i < rows; ++i) {
            const candidateCols = data[i].length;
            if (typeof cols !== "undefined") {
                if (cols != candidateCols) throw new Error("data is not a rectangular structure.");
                const row = data[i];
                for (let j = 0; j < cols; ++j)
                    if (typeof row[j] !== 'number') throw new Error("data[" + i + "][" + j + "] is not a number: " + row[j]);
            } else {
                if (candidateCols) throw new Error("data is not a rectangular structure.");
                if (!candidateCols && typeof data[i] !== 'number') throw new Error("data[" + i + "] is not a number: " + data[i]);
            }
        }
        if (typeof cols === "undefined") return [data.slice(), rows, (rows ? 1 : 0)];
        const result = _allocate(rows * cols);
        for (let i = 0; i < rows; ++i) {
            const row = data[i];
            const i_cols = i * cols;
            for (let j = 0; j < cols; ++j) {
                const index = i_cols + j;
                result[index] = row[j];
            }
        }
        return [result, rows, cols];
    },

    initStorage: function (data, rows, cols) {
        if (!data) throw new Error("data not provided");
        if (!Array.isArray(data)) throw new Error("data is not iterable");
        if (!rows || !cols) return module.exports.initStorageFromRaw(data);
        const size = rows * cols;
        if (data.length != size)
            throw new Error("data dimension is not compatible to provided rows and cols");
        for (let i = 0; i < size; ++i)
            if (typeof data[i] !== 'number') throw new Error("data[" + i + "] is not a number: " + data[i]);
        const result = data.slice();
        return [data, rows, cols];
    },

    get : function(data, rows, cols, r, c) {
        const index = cols * r + c;
        return data[index];
    },

    set : function(data, rows, cols, r, c, val) {
        const index = cols * r + c;
        data[index] = val;
    }

}