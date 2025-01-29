import React from 'react';
import PropTypes from 'prop-types';
import GtagHelper from './GtagHelper';

const GameStatusView = props => {
    const handleRestartClick = () => {
        GtagHelper.sendEvent('restart_game', {
            event_category: 'game',
            event_label: 'User clicked restart',
        });
        props.onShowNumCardsSelection();
    };

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
            <div><button className='game-button' onClick={handleRestartClick}>Play again?</button></div>
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
