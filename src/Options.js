/**
 * Created by sophia on 11/1/16.
 */
import React from 'react';

var Options = React.createClass({

    onClickHandler: function(columns, rows) {
        var handler = this.props.setDimensions;
        return function() {
            handler(columns, rows)
        }
    },
    speedHandler: function(milliseconds) {
        /*var handler = */this.props.setSpeed(milliseconds);
        //return function() {
        //handler(milliseconds)
        //}
    },
    render: function() {
        return (
            <div className="footer footers">
                <div className="row">
                    <span className="optTitle">Board size:</span>
                    <button type="button" className="btn btn-default" onClick={this.onClickHandler(50, 30)} >50 x 30 cubes</button>
                    <button type="button" className="btn btn-default" onClick={this.onClickHandler(70, 50)} >70 x 50 cubes</button>
                    <button type="button" className="btn btn-default" onClick={this.onClickHandler(100, 80)} >100 x 80 cubes</button>
                </div>
                <div className="row">
                    <span className="optTitle">Sim speed:</span>
                    <button type="button" className="btn btn-default" onClick={this.speedHandler(5000)} >Slow</button>
                    <button type="button" className="btn btn-default" onClick={this.speedHandler(2500)} >Medium</button>
                    <button type="button" className="btn btn-default" onClick={this.speedHandler(1)} >Fast</button>
                </div>
            </div>
        );
    }
});

export default Options;