function range(start, end) {
    let len = Math.abs(start - end) + 1;
    return new Array(len).fill().map((_,i) => start < end ? start + i : start - i);
}

function rotateLeft(arr, steps) {
    let newArr = [...arr];
    for (let i = 0; i < steps; i++) {
        let a = newArr.shift();
        newArr.push(a);
    }

    return newArr;
}

function base() {
    return Array.from(Array(9)
        .fill(range(1,9)), (v,i)=>
            rotateLeft(v, i*3+(i>2 ? i>5?2:1 : 0)));
}

function transposing(sudoku, direction=Math.random() > 0.499) {
    //direction true -> left, false - right
    let arr = Array.from(Array(9), () => new Array(9));
    if (direction) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                arr[j][i] = sudoku[i][j];
            }
        }
    } else {
        for (let i = 0, k = arr.length-1; i < arr.length; i++, k--) {
            for (let j = 0; j < 9; j++) {
                arr[j][k] = sudoku[i][j];
            }
        }
    }

    return arr;
}

function swap_rows(sudoku, row=Math.round(Math.random() * 2)){
    let j = [0,3,6][row];
    let i1 = Math.round(Math.random() * 2);
    let i2 = Math.round(Math.random() * 2);
    while (i1 === i2)
        i2 = Math.round(Math.random() * 2);
    i1 += j;
    i2 += j;

    let copy = sudoku[i1];
    sudoku[i1] = sudoku[i2];
    sudoku[i2] = copy;
    
    return sudoku;
}

function copy_column(arr, colIndex) {
    let copy = [];

    for(let i = 0; i < arr.length; i++) {
        copy.push(arr[i][colIndex]);
    }

    return copy;
}

function write_column(arr, index, column) {
    for(let i = 0; i < arr.length; i++) {
        arr[i][index] = column[i];
    }

    return arr;
}

function swap_columns(sudoku, col=Math.round(Math.random() * 2)) {
    let j = [0,3,6][col];
    let i1 = Math.round(Math.random() * 2);
    let i2 = Math.round(Math.random() * 2);
    while (i1 === i2)
        i2 = Math.round(Math.random() * 2);
    i1 += j;
    i2 += j;

    let copy = copy_column(sudoku, i1);
    write_column(sudoku, i1, copy_column(sudoku, i2));
    write_column(sudoku, i2, copy);
    
    return sudoku;
}

function swap_row_areas(sudoku) {
    let i = [0,3,6][Math.round(Math.random() * 2)];
    let j = [0,3,6][Math.round(Math.random() * 2)];
    while (i === j)
        j = [0,3,6][Math.round(Math.random() * 2)];
    
    

    let copy0 = sudoku[i];
    let copy1 = sudoku[i+1];
    let copy2 = sudoku[i+2];

    sudoku[i] = sudoku[j];
    sudoku[i+1] = sudoku[j+1];
    sudoku[i+2] = sudoku[j+2];

    sudoku[j] = copy0;
    sudoku[j+1] = copy1;
    sudoku[j+2] = copy2;

    return sudoku;
}

function swap_column_areas(sudoku) {
    let i = [0,3,6][Math.round(Math.random() * 2)];
    let j = [0,3,6][Math.round(Math.random() * 2)];
    while (i === j)
        j = [0,3,6][Math.round(Math.random() * 2)];

    let copy0 = copy_column(sudoku, i);
    let copy1 = copy_column(sudoku, i+1);
    let copy2 = copy_column(sudoku, i+2);

    write_column(sudoku, i, copy_column(sudoku, j));
    write_column(sudoku, i+1, copy_column(sudoku, j+1));
    write_column(sudoku, i+2, copy_column(sudoku, j+2));

    write_column(sudoku, j, copy0);
    write_column(sudoku, j+1, copy1);
    write_column(sudoku, j+2, copy2);

    return sudoku;
}

function print(arr) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (j % 3 === 0 && j !== 0) process.stdout.write('| ');
            process.stdout.write(arr[i][j]+" ");
        }
        if (i % 3 === 2 && i !== 0)
            console.log('\n---------------------');
        else console.log();
    }
    console.log();
}

const transformations = [
    swap_column_areas, 
    swap_row_areas,
    transposing,
    swap_rows,
    swap_columns,
];

function generate_sudoku(shuffle=30) {
    let bs = base();
    while (shuffle > 0) {
        let i = Math.round(Math.random() * (transformations.length-1));
        bs = transformations[i](bs);
        shuffle--;
    }

    return bs;
}

function create_puzzle(sudoku, difficulty = 30) {
    // print(sudoku);
    sudoku.map(v=>console.log(v));
    difficulty = 81 - difficulty;
    let copy = JSON.parse(JSON.stringify(sudoku));

    for (let i = 0; i < difficulty; i++) {
        let x = Math.floor(Math.random() * 9);
        let y = Math.floor(Math.random() * 9);
        if (copy[x][y] === null) i--;
        copy[x][y] = null;
    }
    return copy;
}
export {generate_sudoku, create_puzzle};








