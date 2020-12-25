import React, { Component } from 'react';
import './Game.css';
import CardView from './CardView';
import { connect } from 'react-redux'
import { flipUpCard, checkMatchedPair, initGame, showNumCardsSelection } from './actions';
import { MAX_PAIRS } from './cardFunctions';

class Game extends Component {
    componentDidMount() {
        setInterval(this.props.onCheckForMatchedPair, 5000);
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

    render() {
        const cardViews = this.getCardViews();
        let gameStatus = undefined;

        if (this.props.showNumCardsSelection) {
            gameStatus = <div className='Game-status'>
                <div>Select number of cards for new game</div>
                <div className='num-cards-button-container'>
                    <button onClick={() => this.props.onInitGame(MAX_PAIRS / 2)}>{MAX_PAIRS}</button>
                    <button onClick={() => this.props.onInitGame(MAX_PAIRS)}>{MAX_PAIRS * 2}</button>
                </div>
            </div>;
        } else if (this.props.gameComplete) {
            gameStatus = <div className='Game-status'>
                <div>GAME COMPLETE!</div>
                <div>You used {this.props.turnNo - 1} turns</div>
                <div><button className='Game-button' onClick={this.props.onShowNumCardsSelection}>Play again?</button></div></div>;
        } else {
            gameStatus = <div className='Game-status'>
                Turn: {this.props.turnNo}   Pairs found: {this.props.pairsFound}
                <button className='Game-button' onClick={this.props.onShowNumCardsSelection}>NEW GAME</button>
            </div>;
        }

        return (
            <div className='Game'>
                <header className='Game-header'>
                    <div className='Game-title'>A Memory game in React with Redux</div>
                </header>
                <div>
                    {gameStatus}
                </div>
                <div className='CardContainer'>
                    {cardViews}
                </div>
            </div>
        );
    }
}


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
            dispatch(flipUpCard(id));
        },
        onCheckForMatchedPair: () => {
            dispatch(checkMatchedPair());
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

