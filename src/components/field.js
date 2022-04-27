import React from 'react';

class Field extends React.Component {

    componentDidMount() {
        document.addEventListener('keydown', this.props.keyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.props.keyDown);
    }

    isEqual(i, j) {
        if (this.props.puzzle[this.props.y][this.props.x]) {
            return this.props.puzzle[this.props.y][this.props.x] == this.props.puzzle[i][j];
        }
        return false;
    }

    isInArea(y, x) {
        return this.props.x === x || this.props.y === y;
    }

    isWrong(x, y) {
        // console.log(this.props.sudoku[x][y], this.props.puzzle[x][y]);
        return this.props.sudoku[x][y] != this.props.puzzle[x][y];
    }

    square(x, y, e) {
        let isSelected = this.props.x === y && this.props.y === x;
        let original = this.props.original[x][y] !== null;
        let isEqual = this.isEqual(x, y);
        let area = this.isInArea(x, y);
        let isWrong = this.isWrong(x, y);

        return (
            <button className={
                        `square
                        ${isSelected && "selected"}
                        ${isEqual && 'same-as-selected'}
                        ${area && 'area'}
                        ${original && 'original-square'}
                        ${isWrong && 'wrong'}
                        ${(y===3||y===6) && 'thick-left-border'}
                        ${(x===2||x===5) && 'thick-bottom-border'}`
                    }
                    onClick={()=>this.props.click(y, x)}
                    key={x+'square'+y}>
                {e}
            </button>
        );
    }

    render() {
        return (<div className='field'>
                    {
                        this.props.puzzle.map((v,i)=>v.map((e,j)=>this.square(i,j,e)))
                    }
                </div>
        )
    }
}

export default Field;