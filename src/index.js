import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import memoryGame from './reducers'
import { shuffleCards } from './actions';
import { Provider } from 'react-redux'

let store = createStore(memoryGame);
store.dispatch(shuffleCards());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
