import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import { winnerIs, fullBoard } from '../../src/lib/game_utils';

describe('game_utils', () => {
    describe('score', () => {
        
            
        it('returns winner if 3 in column', () => {
            const board = fromJS([ 
            ['X', 'O', ''],
            ['X', 'O', 'O'],
            ['X', '', 'X'] ]);
            
            expect(winnerIs(board)).to.eq('X');
        });
        
        it('returns winner if 3 in row', () => {
            const board = fromJS([ 
            ['X', 'O', ''],
            ['X', 'X', 'O'],
            ['O', 'O', 'O'] ]);
            
            expect(winnerIs(board)).to.eq('O');
        });
        
        it('returns winner if 3 in diagonal', () => {
            const board1 = fromJS([ 
            ['X', 'O', ''],
            ['X', 'X', 'O'],
            ['O', '', 'X'] ]);
            
            const board2 = fromJS([
                ['', '', 'O'],
                ['', 'O', ''],
                ['O', '', '']
                ]);
            
            expect(winnerIs(board1)).to.eq('X');
            expect(winnerIs(board2)).to.eq('O');
        });
    });
    
    describe('fullBoard', () => {
       const board1 = fromJS([
           ['X', 'O', 'X'],
           ['O', 'X', 'O'],
           ['O', 'X', 'O']
         ]);
         const board2 = fromJS([
           ['X', 'O', 'X'],
           ['O', 'X', 'O'],
           ['O', 'X', '']
         ]);
        it('returns true iff board is full', () => {
            expect(fullBoard(board1)).to.eq(true);
            expect(fullBoard(board2)).to.eq(false);
        });
    });
});