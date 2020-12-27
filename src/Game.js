import React, { Component } from 'react';
import './Game.css';
import CardView from './CardView';
import { connect } from 'react-redux'
import { flipUpCard, checkUnmatchedPair, checkMatchedPair, initGame, showNumCardsSelection } from './actions';
import NumCardsSelectionView from './NumCardsSelectionView';
import GameStatusView from './GameStatusView';
import UndoRedo from './UndoRedo';

let timeOut = null;

class Game extends Component {
    render() {
        const cardViews = this.getCardViews();
        let gameHUD = undefined;

        if (this.props.showNumCardsSelection) {
            gameHUD = <NumCardsSelectionView onInitGame={this.props.onInitGame} />;
        } else {
            gameHUD = <GameStatusView
                gameComplete={this.props.gameComplete}
                turnNo={this.props.turnNo}
                pairsFound={this.props.pairsFound}
                onShowNumCardsSelection={this.props.onShowNumCardsSelection}
            />;
        }

        return (
            <div className='Game'>
                <header className='Game-header'>
                    <div className='Game-title'>A Memory game in React with Redux</div>
                </header>
                <div className='Game-status'>
                    {gameHUD}
                </div>
                <div className='CardContainer'>
                    {cardViews}
                </div>
                <UndoRedo />
            </div>
        );
    }

    getCardViews() {
        const cardViews = this.props.cards.map(c =>
            <CardView key={c.id}
                id={c.id}
                image={c.image}
                imageUp={c.imageUp}
                matched={c.matched}
                onClick={this.props.onCardClicked} />
        );
        return cardViews;
    }
}


const mapStateToProps = state => {
    return {
        cards: state.present.cards,
        turnNo: state.present.turnNo,
        gameComplete: state.present.gameComplete,
        pairsFound: state.present.pairsFound,
        showNumCardsSelection: state.present.showNumCardsSelection
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCardClicked: id => {
            clearInterval(timeOut);
            dispatch(flipUpCard(id));
            dispatch(checkMatchedPair());
            timeOut = setTimeout(() => {
                dispatch(checkUnmatchedPair())
            }, 4000);
        },
        onShowNumCardsSelection: () => {
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

