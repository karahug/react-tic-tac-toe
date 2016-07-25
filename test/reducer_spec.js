import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { List, Map, fromJS } from 'immutable';

import { setupGame, setRecord, fillCell } from '../src/action_creators';
import reducer from '../src/reducer';


describe('reducer', () => {
    describe('SETUP_GAME', () => {
        const action = setupGame();
        
        describe('with empty initial state', () => {
            const initialState = undefined;
            const nextState = reducer(initialState, action);
            it('sets up of board', () => {
                expect(nextState.get('board').size).to.eq(3);
                expect(nextState.get('player')).to.eq('X');
                expect(nextState.get('gameOver')).to.eq(false);
                expect(nextState.get('winner')).to.eq(undefined);
                nextState.get('board').forEach((row, i) => {
                    expect(row).to.eql(new List(['', '', '']));
                });
            });
            
        });
        
        describe('with existing initial state', () => {
            const initialState = new Map({'xWins': 1, 'oWins': 2, 'gameOver': true});
            const nextState = reducer(initialState, action);
            it('adds new variables', () =>{
                expect(nextState.get('board').size).to.eq(3);
                nextState.get('board').forEach((row, i) => {
                    expect(row).to.eql(new List(['', '', '']));
                });
            });
            
            it('keeps old variables', () => {
                expect(nextState.get('xWins')).to.eq(1);
                expect(nextState.get('oWins')).to.eq(2);
                expect(nextState.get('gameOver')).to.eq(false);
            });
            
            it('overwrites old variables', () => {
                expect(nextState.get('gameOver')).to.eq(false);
            });
        });
    });
    
    describe('SET_RECORD', () => {
        const action = setRecord(0,1);
        const initialState = new Map({'gameOver': false, 'xWins': 1, 'oWins': 2});
        const nextState = reducer(initialState, action);
        
        it('sets xWins and oWins', () => {
            expect(nextState.get('xWins')).to.eq(0);
            expect(nextState.get('oWins')).to.eq(1);
        });
        
        it('keeps old variables', () => {
            expect(nextState.get('gameOver')).to.eq(false);
        });
    });
    
    describe('FILL_CELL', () => {
        const action1 = fillCell(0, 0);
        const action2 = fillCell(2, 1);
        const action3 = fillCell(1,0);
        const action4 = fillCell(2,0);
        const action5 = fillCell(1,1);
        const initialState = new Map({'gameOver':false, 'board': fromJS([['','',''], ['','O',''], ['','','X']]), 'player': 'X' });
        const intermediate = reducer(initialState, action1);
        const nextState = reducer(intermediate, action2);
        const finalState = reducer(nextState, action3);
        const finalestState = reducer(finalState, action4);
        const lastFinalState = reducer(finalestState, action5);
        
        it('changes the right cells', () => {
            expect(finalestState.get('board').get(0).get(0)).to.eq('X');
            expect(finalestState.get('board').get(2).get(1)).to.eq('O');
            expect(finalestState.get('board').get(1).get(0)).to.eq('X');   
            expect(finalestState.get('board').get(2).get(0)).to.eq('O');
            expect(finalestState.get('player')).to.eq('X');
        });
        
        it('does not allow overwriting existing cells', () => {
            expect(lastFinalState.get('board').get(1).get(1)).to.eq('O');
            expect(lastFinalState.get('player')).to.eq('X');
        });
        
        it('keeps old variables', ()=>{
            expect(finalestState.get('board').get(1).get(1)).to.eq('O');
            expect(finalestState.get('gameOver')).to.eq(false);
        });
        
        describe('game over', () => {
            const initialState = fromJS({'board': [
                    ['X', '', ''],
                    ['', 'X', ''],
                    ['', '', '']
                ], 'player': 'X', 'gameOver': false, 'winner': undefined, 'xWins': 0, 'oWins':0});
            const action = fillCell(2,2);
            const nextState = reducer(initialState, action);
            
            it('sets gameOver to true', () => {
                expect(nextState.get('gameOver')).to.eq(true);
            });
            
            it('sets winner', () => {
               expect(nextState.get('winner')).to.eq('X');
            });
            
            it('sets wins', () => {
                expect(nextState.get('xWins')).to.eq(1);
                expect(nextState.get('oWins')).to.eq(0);
            })
            
            describe('draws', () => {
                const initialState = fromJS({
                    'board': [
                      ['X', 'O', 'X'],
                      ['X', 'O', 'O'],
                      ['O', 'X', '']
                    ],
                    'player': 'X',
                    'gameOver': false,
                    'winner': undefined,
                    'xWins': 0,
                    'oWins': 0
                });
                const action = fillCell(2,2);
                const nextState = reducer(initialState, action);
                it('sets gameOver to true', () => {
                    expect(nextState.get('gameOver')).to.eq(true);
                });
                
                it('leaves keeps the old variables', () => {
                    expect(nextState.get('winner')).to.eq(undefined);
                    expect(nextState.get('xWins')).to.eq(0);
                    expect(nextState.get('oWins')).to.eq(0);
                });
            });
        });
    });
});