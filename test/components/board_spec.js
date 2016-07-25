import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import { Board } from '../../src/components/board';

describe('<Board/>', () => {
    const board = fromJS( [ ['X', 'O', ''],
             ['X', '', 'O'],
             ['O', '', 'X'] ]);
    const wrapper = shallow(<Board board={board}/>);
    
    describe('render', () => {
        it('renders 9 cells', () => {
            expect(wrapper.find('Cell')).to.have.length(9);
        });
        
        it('renders the first 4 cells with correct props', () => {
            const CellContent = (n) => {
              return wrapper.find('Cell').at(n).props().content;  
            };
            expect(CellContent(0)).to.eq('X');
            expect(CellContent(1)).to.eq('O');
            expect(CellContent(2)).to.eq('');
            expect((CellContent(3))).to.eq('X');
        });
        
    });
});