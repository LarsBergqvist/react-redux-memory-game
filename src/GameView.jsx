import React from 'react';
import PropTypes from 'prop-types';
import './Game.css';
import CardView from './CardView';
import { connect } from 'react-redux'
import { flipUpCard, checkUnmatchedPair, checkMatchedPair, initGame, showNumCardsSelection } from './actions';
import NumCardsSelectionView from './NumCardsSelectionView';
import GameStatusView from './GameStatusView';
import GtagHelper from './GtagHelper';

let timeOut = null;

const Game = props => {
    const cardViews = props.cards.map(c =>
        <CardView key={c.id}
            id={c.id}
            image={c.image}
            imageUp={c.imageUp}
            matched={c.matched}
            onClick={props.onCardClicked} />
    );

    let gameHUD = undefined;

    if (props.showNumCardsSelection) {
        gameHUD = <NumCardsSelectionView onInitGame={props.onInitGame} />;
    } else {
        gameHUD = <GameStatusView
            gameComplete={props.gameComplete}
            turnNo={props.turnNo}
            pairsFound={props.pairsFound}
            onShowNumCardsSelection={props.onShowNumCardsSelection}
        />;
    }

    return (
        <div className='game'>
            <header className='game-header'>
                <div className='game-title'>A Memory game in React with Redux</div>
            </header>
            <div className='game-status'>
                {gameHUD}
            </div>
            <div className='card-container'>
                {cardViews}
            </div>
        </div>
    );
}

Game.propTypes = {
    gameComplete: PropTypes.bool,
    showNumCardsSelection: PropTypes.bool,
    onShowNumCardsSelection: PropTypes.func,
    cards: PropTypes.array,
    onCardClicked: PropTypes.func,
    onInitGame: PropTypes.func,
    turnNo: PropTypes.number,
    pairsFound: PropTypes.number
};

const mapStateToProps = state => {
    return {
        cards: state.cards,
        turnNo: state.turnNo,
        gameComplete: state.gameComplete,
        pairsFound: state.pairsFound,
        showNumCardsSelection: state.showNumCardsSelection
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCardClicked: id => {
            GtagHelper.sendEvent('card_clicked', {
                event_category: 'game',
                event_label: 'User clicked card',
            });
            clearInterval(timeOut);
            dispatch(flipUpCard(id));
            dispatch(checkMatchedPair());
            timeOut = setTimeout(() => {
                dispatch(checkUnmatchedPair())
            }, 4000);
        },
        onShowNumCardsSelection: () => {
            GtagHelper.sendEvent('game_restarted', {
                event_category: 'game',
                event_label: 'User has initiated game restart',
            });
            dispatch(showNumCardsSelection());
        },
        onInitGame: numPairs => {
            dispatch(initGame(numPairs));
        }
    }
}

const GameView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)

export default GameView;

