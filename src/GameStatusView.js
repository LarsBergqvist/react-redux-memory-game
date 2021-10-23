import React from 'react';
import PropTypes from 'prop-types';

const GameStatusView = props => {
    if (props.gameComplete) {
        return <>
            <div>GAME COMPLETE!</div>
            <div>You used {props.turnNo - 1} turns</div>
            <div><button className='game-button' onClick={props.onShowNumCardsSelection}>Play again?</button></div>
        </>;
    } else {
        return <>
            <div>
                Turn: {props.turnNo}   Pairs found: {props.pairsFound}
            </div>
            <button className='game-button' onClick={props.onShowNumCardsSelection}>Restart game</button>
        </>;
    }
}

GameStatusView.propTypes = {
    gameComplete: PropTypes.bool,
    onShowNumCardsSelection: PropTypes.func,
    turnNo: PropTypes.number,
    pairsFound: PropTypes.number
};

export default GameStatusView;
