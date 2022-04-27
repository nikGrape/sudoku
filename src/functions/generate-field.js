import {isInColumn, isInRow, isInSquare} from "./check";

function generateField() {
    let field = Array.from(Array(9), () => new Array(9));

    for (let i = 0; i < 30;) {
        let n = Math.floor(Math.random() * 9) + 1;
        let x = Math.floor(Math.random() * 9);
        let y = Math.floor(Math.random() * 9);

        if (!(isInColumn(field, x, y, n) || isInRow(field, x, y, n) || isInSquare(field, x, y, n))) {
            console.log("here ", i, field[y][x]);
            if (field[y][x] !== undefined) continue;
            field[y][x] = n;
            i++
        }
    }


    return field;
}

export {generateField};