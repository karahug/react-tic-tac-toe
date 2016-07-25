import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import { App } from '../../src/components/app';

describe('<App>', () => {
    
    describe('render()', () => {
        describe('game is ongoing', () => {
            const state = fromJS({
                board: [],
                gameOver: false,
                winner: undefined
            });
            const wrapper = shallow(<App board={state.get('board')} gameOver={state.get('gameOver')} winner={state.get('winner')} player={'X'} xWins={0} oWins={0}/>);
            
            it('renders an h1 tag', () => {
                expect(wrapper).to.have.exactly(1).descendants('h1');
            });
            
            it('renders board', () => {
                expect(wrapper.find('Connect(Board)')).to.have.length(1);
            });
            
            it( "doesn't render message ", () => {
                expect(wrapper.find('Message')).to.have.length(0);
            });
            
            it('renders score and player turn', () => {
                expect(wrapper.find('span').first()).to.have.text('X: 0 ');
                expect(wrapper.find('span').at(1)).to.have.text(' O: 0 ');
                expect(wrapper.find('span').last()).to.have.text("X's turn");
            });
        });
        
        describe('game is over', () => {
            const state = fromJS({
                board: [],
                gameOver: true,
                winner: undefined
            });
            const wrapper = shallow(<App board={state.get('board')} gameOver={state.get('gameOver')} winner={state.get('winner')}/>);
            it('renders message', () => {
                expect(wrapper.find('Connect(Message)')).to.have.length(1);
            });
        });
    });
});