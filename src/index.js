import React from 'react';
import ReactDOM from 'react-dom';
import { fromJS } from 'immutable';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { AppContainer } from './components/app';
import reducer from './reducer';
import { setupGame, setRecord } from './action_creators';

// Add CSS files to bundle
require('../src/css/application.scss');



let store = createStore(reducer, undefined, window.devToolsExtension ? window.devToolsExtension() : undefined);

store.dispatch(setupGame());
store.dispatch(setRecord(0,0));

// Render application to DOM
ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);