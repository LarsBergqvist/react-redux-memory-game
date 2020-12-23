import React, { Component } from 'react';
import './Game.css';
import CardView from './CardView';
import { connect } from 'react-redux'
import { flipUpCard, checkMatchedPair, initGame } from './actions';

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
        let gameStatus = <div className='Game-status'>
            <div>Turn: {this.props.turnNo}</div>
            <div>Pairs found: {this.props.pairsFound}</div>
            <div><button onClick={this.props.onPlayAgain}>RESET GAME</button></div>
        </div>;

        if (this.props.gameComplete) {
            gameStatus = <div className='Game-status'>
                <div>GAME COMPLETE!</div>
                <div>You used {this.props.turnNo - 1} turns</div>
                <div><button onClick={this.props.onPlayAgain}>Play again?</button></div></div>;
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
        pairsFound: state.pairsFound
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
        onPlayAgain: () => {
            dispatch(initGame());
        }
    }
}

const GameView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)

export default GameView;

