import { fromJS } from 'immutable';

export const winnerIs = (board) => {
    //check rows
    const rowsWinner = checkRows(board);
    if(rowsWinner) {
        return rowsWinner;
    }
    //check columns
    const transposed = transpose(board);
    const columnsWinner = checkRows(transposed);
    if(columnsWinner) {
        return columnsWinner;
    }
    
    //check diagonals
    const diagonals = getDiagonals(board);
    const diagonalsWinner = checkRows(diagonals);
    if(diagonalsWinner) {
        return diagonalsWinner;
    }
};

export const fullBoard = (board) => {
    const full = board.reduce((rowNotEmpty, currentRow) => {
        return rowNotEmpty && (currentRow.reduce((notEmpty, currentCell) => {
            return notEmpty && (currentCell != '');
        }, true));
    }, true);
    return full;
};

const transpose = (array) => {
    const newArray = [];
    for(let i = 0; i < array.count(); i++) {
        newArray[i] = [];
        for(let j = 0; j < array.get(i).count(); j++){
            newArray[i][j] = array.get(j).get(i);
        }
    }
    return fromJS(newArray);
};

const checkRows = (board) => {
    for(let i = 0; i < board.count(); i++){
        const rowSame = board.get(i).reduce((prev, cell, j, array) => {
            return prev && (cell == array.get(j-1));
        }, true);
        if(rowSame == true){
            return board.get(i).get(0);
        }
    }
    return false;
};

const getDiagonals = (board) => {
    let firstDiagonal = [];
    let secondDiagonal = [];
    for(let i = 0; i < board.count(); i++) {
        firstDiagonal[i] = board.get(i).get(i);
        secondDiagonal[i] = board.get(i).get(board.get(i).count() - i - 1);
    }
    return fromJS([firstDiagonal, secondDiagonal]);
};