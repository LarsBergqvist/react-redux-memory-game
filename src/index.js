import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import memoryGame from './reducers';
import { initGame } from './actions';
import { Provider } from 'react-redux';
import { MAX_PAIRS } from './cardFunctions';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import GameView from './GameView';

// For integration with Redux DevTools in browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(memoryGame, composeEnhancers(
    applyMiddleware(thunk)
));
store.dispatch(initGame(MAX_PAIRS));

ReactDOM.render(
    <Provider store={store}>
        <GameView />
    </Provider>
    , document.getElementById('root'));
