function isInColumn(arr, i, j, num) {
    let column = getColumn(arr, i, j);

    return column.includes(num);
}


function isInRow(arr, i, j, num) {
    let row = getRow(arr, i, j);
    return row.includes(num);
}

function isInSquare(arr, i, j, num) {
    let square = getSquare(arr, i, j);
    return square.includes(num);
}


function getRowRange(i, j) {
    let is = [];
    let js = [];
    if ([0,1,2].includes(i)) is = [0,1,2];
    if ([3,4,5].includes(i)) is = [3,4,5];
    if ([6,7,8].includes(i)) is = [6,7,8];

    if ([0,1,2].includes(j)) js = [0,1,2];
    if ([3,4,5].includes(j)) js = [3,4,5];
    if ([6,7,8].includes(j)) js = [6,7,8];

    return {is, js};
}

function getColumnRange(i, j) {
    let is = [];
    let js = [];
    if ([0,3,6].includes(i)) is = [0,3,6];
    if ([1,4,7].includes(i)) is = [1,4,7];
    if ([2,5,8].includes(i)) is = [2,5,8];

    if ([0,3,6].includes(j)) js = [0,3,6];
    if ([1,4,7].includes(j)) js = [1,4,7];
    if ([2,5,8].includes(j)) js = [2,5,8];

    return {is, js};
}


function getColumn(arr, i, j) {
    let range = getColumnRange(i, j);
    let column = [];

    for (let k of range.is) {
        for (let l of range.js) {
            column.push(arr[l][k]);
        }
    }

    return column;
}

function getRow(arr, i, j) {
    let range = getRowRange(i, j);
    let row = [];

    for (let k of range.is) {
        for (let l of range.js) {
            row.push(arr[l][k]);
        }
    }

    return row;
}

function getSquare(arr, i, j) {
    let square = [];

    for (let k = 0; k < 9; k++) {
        square.push(arr[k][i]);
    }
    return square;
}

export {getRow, getRowRange, getColumn, getColumnRange, isInRow, isInColumn, isInSquare, getSquare};