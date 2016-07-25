export function setupGame() {
    return( { "type": "SETUP_GAME" } );
}

export function setRecord(xWins, oWins){
    return( { "type": "SET_RECORD", xWins, oWins } );
}

export function fillCell(row, col){
    return( { "type": "FILL_CELL", row, col } );
}