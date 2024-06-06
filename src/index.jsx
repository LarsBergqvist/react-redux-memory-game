import React from 'react';
import './index.css';
import memoryGame from './reducers';
import { initGame } from './actions';
import { Provider } from 'react-redux';
import { MAX_PAIRS } from './cardFunctions';
import { createStore, compose } from 'redux';
import GameView from './GameView';
import { createRoot } from 'react-dom/client';
// For integration with Redux DevTools in browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(memoryGame, composeEnhancers(
));
store.dispatch(initGame(MAX_PAIRS));

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <GameView />
    </Provider>
);
