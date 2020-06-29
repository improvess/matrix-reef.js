const { EINPROGRESS } = require("constants");

module.exports = {

    compare: function (matrix, array, precision) {
        let result = true;
        if (!matrix) throw new Error("Matrix not provided");
        if (!array) throw new Error("array not provided");
        const rows = matrix.rows;
        const cols = matrix.cols;
        if (!rows || !cols) 
            throw new Error("Matrix rows/cols not defined");
        if (rows != array.length) throw new Error("Matrix rows and array length does not match");
        const arrayCols = array[0].length;
        if (!arrayCols && cols != 1) throw new Error("Matrix cols and array cols does not match");
        if (arrayCols && cols != arrayCols) throw new Error("Matrix cols and array cols does not match");
        const arrayRows = array.length;
        const storage = matrix.storage;
        if (!arrayCols) {
            for(let i = 0; i < arrayRows; ++i) {
                const value = array[i];
                if (typeof value !== "number") throw new Error("array value at " + i + " is not a number: " + value);
                const toCompare = storage[i];
                if (Math.abs(toCompare - value) > precision) 
                    throw new Error("array and matrix differ at " + i + " array: " + value + " matrix: " + toCompare);
            }
        } else {
            for(let i = 0; i < arrayRows; ++i) {
                const row = array[i];
                const i_cols = i * cols;
                for(let j = 0; j < arrayCols; ++j) {
                    const value = row[j];
                    if (typeof value !== "number") throw new Error("array value at " + i + " is not a number: " + value);
                    const index = i_cols + j;
                    const toCompare = storage[index];
                    if (typeof toCompare !== "number") throw new Error("toCompare value at " + index + " is not a number: " + value);
                    if (Math.abs(toCompare - value) > precision) 
                        throw new Error("array and matrix differ at " + i + ", " + j + " array: " + value + " matrix: " + toCompare);
                }
            }
        }
        return result;
    },

    randomSizeArray : function(maxRows, maxCols, minRows, minCols, generator) {

        let rows = Math.round(maxRows * Math.random() + minRows);
        let cols = Math.round(maxCols * Math.random() + minCols);

        rows = Math.max(rows, 1);
        cols = Math.max(cols, 0);

        const result = new Array(rows);

        for (let i = 0; i < rows; ++i) {
            if (cols == 0) {
                result[i] = generator(i, 0);
            } else {
                const row = new Array(cols);
                result[i] = row;
                for (let j = 0; j < cols; ++j) {
                    const val = generator(i, j);
                    row[j] = val;
                }
            }
        }
        return result;

    },

    randomArray : function(rows, cols, generator) {

        rows = Math.max(rows, 1);
        cols = (cols) ? Math.max(cols, 0) : undefined;

        const result = new Array(rows);

        for (let i = 0; i < rows; ++i) {
            if (!cols) {
                result[i] = generator(i, 0);
            } else {
                const row = new Array(cols);
                result[i] = row;
                for (let j = 0; j < cols; ++j) {
                    const val = generator(i, j);
                    row[j] = val;
                }
            }
        }
        return result;

    }


}