import './scss/styles.scss';

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, compose, combineReducers} from 'redux'
import {persistState} from 'redux-devtools';
import Immutable from 'immutable';
import PedalboardReducer from './js/Pedalboard/PedalboardReducer'
import AppContainer from './js/AppContainer';

const initialState = Immutable.fromJS({
    pedalboard: {
        pedals: [],
    },
});

const store = createStore(PedalboardReducer, Immutable.fromJS(initialState),
    window.devToolsExtension ? window.devToolsExtension() : undefined
);

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);
