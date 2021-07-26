import React from 'react';
import PropTypes from 'prop-types';
import { MAX_PAIRS } from './cardFunctions';

const NumCardsSelectionView = props =>
    <>
        <div>Select number of cards for new game</div>
        <div className='num-cards-button-container'>
            <button onClick={() => props.onInitGame(3)}>{6}</button>
            <button onClick={() => props.onInitGame(MAX_PAIRS / 2)}>{MAX_PAIRS}</button>
            <button onClick={() => props.onInitGame(MAX_PAIRS)}>{MAX_PAIRS * 2}</button>
        </div>
    </>;

NumCardsSelectionView.propTypes = {
    onInitGame: PropTypes.func
};

export default NumCardsSelectionView;
