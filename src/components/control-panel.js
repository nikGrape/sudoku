import React from 'react';


class ControlPanel extends React.Component {


    render() {
        return <div>
            <div className="header"><p>Sudoku</p><p>new game</p></div>
            <div className='bar'><p>Difficulty:</p><p>check mistakes</p><p>time</p></div>
        </div>
    }
}

export default ControlPanel;