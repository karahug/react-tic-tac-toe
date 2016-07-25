import React from 'react';

export class Cell extends React.Component {
    render() {
        return(
            <span onClick={()=>{this.props.onCellClick(this.props.row, this.props.col)}} className="cell"> {this.props.content=='' ? '' : this.props.content}</span>
        );
    }
}