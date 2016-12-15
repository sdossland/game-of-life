/**
 * Created by sophia on 11/1/16.
 */
import React from 'react';
import Cell from './Cell';

var Gameboard = React.createClass({
    toggleCell: function(x, y) {
        var setCell = this.props.setCell;
        var countNeighbors = this.props.countNeighbors;
        return function() {
            setCell(x, y);
            countNeighbors(x, y);
        };
    },
    render: function() {
        var gameboardWidth = this.props.noCubeWidth * 12 + 20,
            gameboardHeight = this.props.noCubeHeight * 12 + 20,
            sessionId = this.props.sessionId,
            toggleCell = this.toggleCell;
        return (
            <div className="gameBoard" style={{height: gameboardHeight, width: gameboardWidth}}>
                {this.props.cells.map(function(row) {
                    return row.map(function(cell) {
                        return (<Cell key={cell.row + '_' + cell.key}
                                      toggleCell={toggleCell(cell.key, cell.row)}
                                      row={cell.row} column={cell.key}
                                      isActive={cell.isActive}
                                      sessionId={sessionId}
                        />);
                    });
                })}
            </div>
        );
    }
});

export default Gameboard;