import React from 'react';
import {connect} from 'react-redux';
import { setupGame } from '../action_creators';


export class Message extends React.Component {
    render() {
        return(
            <div>
                <span>{this.props.winner ? this.props.winner + ' wins' : 'draw game'}</span>
                <button onClick={this.props.onClickRestart}>Restart</button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        winner: state.get('winner')
    };
}

function mapDispatchToProps(dispatch){
    return{
        onClickRestart: () => {dispatch(setupGame())}
    };
}

export const MessageContainer = connect(mapStateToProps, mapDispatchToProps)(Message);