import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import memoryGame from './reducers'
import { initGame } from './actions';
import { Provider } from 'react-redux';
import { MAX_PAIRS } from './cardFunctions';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const store = createStore(
    memoryGame,
    applyMiddleware(thunk)
)
store.dispatch(initGame(MAX_PAIRS));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
