import { fromJS, Map, List } from 'immutable';

import { winnerIs, fullBoard } from './lib/game_utils';

const setupGame = (currentState) => {
    const nextState = fromJS({
        board: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
            ],
        gameOver: false,
        winner: undefined,
        player: 'X'
    });
    return currentState.merge(nextState);
};

const setRecord = (currentState, xWins, oWins) => {
    const nextState = new Map({xWins, oWins});
    return currentState.merge(nextState);
};

const fillCell = (currentState, row, col) => {
    const currentRow = currentState.get('board').get(row);
    if(currentRow.get(col) != ''){
        return currentState;
    }
    const newBoard = currentState.get('board').set(row, currentRow.set(col, currentState.get('player')));
    const winner = winnerIs(newBoard);
    const full = fullBoard(newBoard);
    let xWins = currentState.get('xWins');
    let oWins = currentState.get('oWins');
    if(winner == 'X') {
        xWins += 1;
    } else if(winner == 'O'){
        oWins += 1;
    }
    
    const nextState = new Map({"board": newBoard, 
        "player": (currentState.get('player') == 'X' ? 'O' : 'X'),
        "gameOver": (winner || full ? true : false),
        "winner": winner,
        "xWins": xWins,
        "oWins": oWins
    });
    return currentState.merge(nextState);
};

export default function(currentState=new Map(), action) {
   switch(action.type) {
       case 'SETUP_GAME' : 
           return setupGame(currentState);
        case 'SET_RECORD' :
            return setRecord(currentState, action.xWins, action.oWins);
        case 'FILL_CELL' :
            return fillCell(currentState, action.row, action.col);
   }
   return currentState;
}