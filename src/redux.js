import {createStore} from 'redux';
import React from "react";
import Field from './components/field'
import {connect} from 'react-redux';
import {Provider} from "react-redux";
import arrowsHandler from "./functions/arrowsHandler";

import {create_puzzle, generate_sudoku} from "./functions/generate-sudocu";
import {getColumn, getRow, getSquare} from "./functions/check";

let sudoku = generate_sudoku();
let puzzle = create_puzzle(sudoku, 30);

let defaultState = {
    x: 0,
    y: 0,
    sudoku: sudoku,
    puzzle: puzzle,
    original: JSON.parse(JSON.stringify(puzzle)),
    update: 0,
}

const click = (x, y) => {
    return {
        type: 'CLICK',
        x,
        y,
    };
}

const key = (event) => {
    return {
        type: 'KEY',
        event,
    }
}

function handleKeyDown(data, key) {
    if (key.startsWith('Arrow')) {
        arrowsHandler(data, key);
    } else if (key.match(/delete|backspace/ig)) {
        if (data.original[data.y][data.x] === null)
            data.puzzle[data.y][data.x] = null;
    } else if (key.match(/[1-9]/)) {
        if (data.original[data.y][data.x] === null) {
            if (data.puzzle[data.y][data.x] === key)
                data.puzzle[data.y][data.x] = null;
            else
                data.puzzle[data.y][data.x] = key;

        }
    }
}

function reducer(state = defaultState, action) {
    console.log(action.type);
    let newState = {...state};
    switch (action.type) {
        case ('CLICK') :
            console.log('row', getRow(state.puzzle, action.x, action.y));
            console.log('col', getColumn(state.puzzle, action.x, action.y));
            console.log('sqr', getSquare(state.puzzle, action.x, action.y));
            newState.x = action.x;
            newState.y = action.y;
            break;
        case ('KEY') :
            handleKeyDown(newState, action.event.key);
            newState.update += 1;
    }

    return newState;
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        click: function (x, y) {
            dispatch(click(x, y));
        },
        keyDown: function (event) {
            dispatch(key(event));
        }
    }
}


const store = createStore(reducer);
const ConnectedField = connect(mapStateToProps, mapDispatchToProps)(Field);

class AppWrapper extends React.Component {
    render() {
        return <Provider store={store}>
            <ConnectedField/>
        </Provider>
    }
}


export {AppWrapper};
export {ConnectedField};
