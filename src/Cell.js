/**
 * Created by sophia on 11/1/16.
 */
import React from 'react';

var Cell = React.createClass({
    render: function() {
        return (
            <div /*1. an if stmt for two classnames re: what color cell should be,*/
                className={this.props.isActive ? "active" : "cell"}
                onClick={this.props.toggleCell}></div>
        );
    }
});

export default Cell;