/**
 * Created by sophia on 11/1/16.
 */
import React from 'react';

var GameControls = React.createClass({
    render: function() {
        return (
            <div className="footer half-footer">
                <button type="button" className="btn btn-default btn-controls" onClick={this.props.startBtn} >{this.props.start}</button>
                <button type="button" className="btn btn-default btn-controls" onClick={this.props.resetBtn} >Reset</button>
                <button type="button" className="btn btn-default btn-controls" onClick={this.props.clearBtn} >Clear</button>
                <span className="generations">Generations:</span>
                <span className="genCounter">{this.props.genText}</span>
            </div>
        );
    }
});

export default GameControls;