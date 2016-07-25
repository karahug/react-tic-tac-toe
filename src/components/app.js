import React from 'react';
import {connect} from 'react-redux';

import { BoardContainer } from './board';
import { MessageContainer } from './message';

export class App extends React.Component {
    render() {
        return (
            <div className="app">
                <h1 className="title">Tic Tac Toe</h1>
                <div className="score">
                <span>X: {this.props.xWins} </span>
                <span > O: {this.props.oWins} </span>
                </div>
                <BoardContainer/>
                <div className="info">
                    <span className="player-turn">{this.props.player}'s turn</span>
                    {this.props.gameOver ? <MessageContainer/> : ''}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        gameOver: state.get('gameOver'),
        board: state.get('board'),
        xWins: state.get('xWins'),
        oWins: state.get('oWins'),
        player: state.get('player')
      };
}

export const AppContainer = connect(mapStateToProps)(App);