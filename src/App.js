import React from 'react';
import Options from './Options';
import Gameboard from './Gameboard';
import GameControls from './GameControls';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

var App = React.createClass({
  getInitialState: function() {
    return ({
      noCubeHeight: 10,
      noCubeWidth: 10,
      //cells: this.calculateCells(5, 10, 0.8),
      sessionId: 0,
      neighbor: 0,
      start: 'Pause', //move to GameControls??
      genText: 0, //move to GameControls??
      //genSpeed: 1000
    });
  },
  calculateCells: function(noCubeHeight, noCubeWidth, isActive) {
    var cellArr = [];
    for (var i=0; i<noCubeHeight; i++) {
      var row = [];
      for (var j=0; j<noCubeWidth; j++) {
        this.isActive = Math.random() > isActive;
        row.push({ key: j, row: i, isActive: this.isActive });
      }
      cellArr.push(row);
    }
    return cellArr;
  },
  genSessionId: function() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16);
  },
  //need to get this to keep running until clearInterval() has been hit
  componentWillMount: function() {
    this.setState({
      cells: this.calculateCells(10, 10, 0.85),
      genSpeed: this.movingGrid(1000) //pass in this.state.milliseconds??

    });

  },
  setCell: function(x, y) {
    //console.log(x, y);
    var cells = this.state.cells.slice();
    cells[y][x]['isActive'] = !cells[y][x]['isActive'];
    this.setState({ cells: cells });
    //console.log(this.state.cells[2][1].isActive);
    //y=row, x=column
  },
  setDimensions: function(rows, columns) {
    this.setState({
      noCubeHeight: rows,
      noCubeWidth: columns,
      cells: this.calculateCells(rows, columns, 0.85)
    });
  },
//WIP re: speed of mutations
  setSpeed: function(milliseconds) {
    this.setState({
      //genSpeed: milliseconds,
      genSpeed: this.movingGrid(milliseconds)
    });
  },
//confirms that neighbor is within grid
  neighborInGrid: function(rows, columns) {
    if (columns >= 0 && columns < this.state.noCubeWidth && rows >= 0 && rows < this.state.noCubeHeight) {
      return true;
    }
    return false;
  },
//finds the number of neighbors for each cell
  countNeighbors: function(rows, columns, cells) {
    var cell = cells[rows][columns];
    var neighborCells = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    cell.neighbor = 0;
    for (var k=0; k<8; k++) {
      var rowChange = neighborCells[k][0];
      var columnChange = neighborCells[k][1];
      if (this.neighborInGrid((rows + rowChange), (columns + columnChange))) {
        var neighbor = cells[rows + rowChange][columns + columnChange];
        if (neighbor.isActive) {
          cell.neighbor++;
        }
      }
    }
    //console.log(cell.neighbor);
    return cell.neighbor;
  },
  cellFate: function(neighborCount, isActive) {
//cellDeath
    if (isActive) {
      if (neighborCount < 2 || neighborCount > 3) {
        return false; //what does false return??
      } else { //since no change, don't need to mention anything??
        return true;
      }
//cellBirth
    } else if (!isActive) {
      if (neighborCount === 3) {
        return true;
      } else {
        return false; //not sure if i need this, but let's try
      }
    }
  },
//first formulas finds neighbor for each cell. then loop through row, then width and find neighbor cells. once all neighbor cells are found, update to death or birth to prep for next generation.
  updateToNextGen: function() {
    var cells = this.state.cells.slice();
    for (var i=0; i<this.state.noCubeHeight; i++) {
      for (var j=0; j<this.state.noCubeWidth; j++) {
        var neighborCount = this.countNeighbors(i, j, cells);
        var isActive = this.cellFate(neighborCount, cells[i][j].isActive);
        if (isActive === true) cells[i][j].isActive = true;
        else if (isActive === false) cells[i][j].isActive = false; //row by row??
      }
    }
    this.setState({ cells: cells });
  },
  updateGenText: function() {
    var genText = this.state.genText;
    this.setState({
      genText: genText + 1
    });
  },
  //WIP
  movingGrid: function(milliseconds) {
    var updateToNextGen = this.updateToNextGen;
    var updateGenText = this.updateGenText;
    //var genSpeed = this.state.genSpeed;
    var genSpeed = milliseconds;
    //console.log(genSpeed);
    //'this.interval' saves it to the state
    this.interval = setInterval(function() {
      //this.countNeighbors();
      updateToNextGen();
      updateGenText();
      //this.forceUpdate();
    }/*.bind(this)*/, genSpeed);
    console.log(genSpeed);
  },
  clearBoard: function(isActive) {
    this.setState({
      cells: this.calculateCells(this.state.noCubeWidth, this.state.noCubeHeight, isActive),
      sessionId: this.genSessionId(),
    });
  },
  //WIP
  startBtn: function(e) {
    if (e.target.innerHTML === 'Pause') {
      //insert code to freeze the setInterval
      this.setState({start: 'Start'});
    } else if (e.target.innerHTML === 'Start') {
      this.movingGrid(); //insert code to get code running in setInterval
      this.setState({start: 'Pause'});
    }
  },
  //WIP
  resetBtn: function() {
    clearInterval(this.interval);
    this.clearBoard(0.8);
    //insert code to essentially get it back to initial state aka running.
    this.setState({
      start: 'Pause',
      genText: 0
    });
  },
  clearBtn: function() {
    this.clearBoard(1);
    this.setState({
      start: 'Start',
      genText: 0
    })
  },
  render: function() {
    return (
        <div id="overallLayout">
          <a href="https://www.math.cornell.edu/~lipa/mec/lesson6.html" target="_blank">
            <h1 className="appTitle">ReactJS Game of Life (click to learn more)</h1>
          </a>
          <GameControls start={this.state.start}
                        startBtn={this.startBtn}
                        resetBtn={this.resetBtn}
                        clearBtn={this.clearBtn}
                        genText={this.state.genText} />
          <Gameboard noCubeWidth={this.state.noCubeWidth}
                     noCubeHeight={this.state.noCubeHeight}
                     sessionId={this.state.sessionId}
                     cells={this.state.cells}
                     setCell={this.setCell}
                     countNeighbors={this.countNeighbors} />
          <Options setDimensions={this.setDimensions} setSpeed={this.setSpeed} />
          <div className="footer">
            <span className="footerText">Feel free to add cells while it's running. The cells in light red are younger, dark red are older. Enjoy!</span>
          </div>
        </div>
    );
  }
});

export default App;
