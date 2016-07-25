import React from 'react';
import {connect} from 'react-redux';
import { fillCell } from '../action_creators';


import { Cell } from './cell';

export class Board extends React.Component {
    render() {
        return(
            <div className="board">

                {this.props.board.map((row, i)=>{
                    return(
                        <div className="row" key={i}>{
                            row.map(
                                (column, j)=>{
                                    return(<Cell onCellClick={this.props.onCellClick} content={column} row={i} col={j} key={i^2 + 2* j^2}/>);
                                }
                            )
                        } </div>
                    );
                })}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
       board: state.get('board') 
    };
} 

function mapDispatchToProps(dispatch){
    return {
        onCellClick: (i,j)=> {
            dispatch(fillCell(i,j));
        }
    };
}

export const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);