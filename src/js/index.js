import '../scss/styles.scss';

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, compose, combineReducers} from 'redux'
import {persistState} from 'redux-devtools';
import Immutable from 'immutable';
import AppReducer from './AppReducer'
import AppContainer from './AppContainer';

const initialState = Immutable.fromJS({
    pedalboard: {
        pedals: {},
    },
    midi: {
        newEvent: false,
    }
});

const store = createStore(AppReducer, Immutable.fromJS(initialState)/*,
    window.devToolsExtension ? window.devToolsExtension() : undefined*/
);

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);
