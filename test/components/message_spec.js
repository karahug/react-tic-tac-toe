import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import sinon from 'sinon';

import { Message } from '../../src/components/message';

describe('<Message/>', () =>{
    const onClickRestartSpy = sinon.spy();
    const wrapper = shallow(<Message winner={'X'} onClickRestart={onClickRestartSpy}/>);
    it('displays winner', () => {
        expect(wrapper.find('span').first()).to.have.text('X wins');
    });
    
    it('renders restart button', () => {
        expect(wrapper.find('button').first()).to.have.text('Restart');
    });
    
    it('invokes prop function when restart is clicked', () => {
        wrapper.find('button').first().simulate('click');
        expect(onClickRestartSpy.calledOnce).to.eq(true);
    });
    
    describe('draw game', () => {
        const wrapper = shallow(<Message winner={undefined}/>);
        it('displays draw game', () => {
            expect(wrapper.find('span').first()).to.have.text('draw game');
        });
    });
});

