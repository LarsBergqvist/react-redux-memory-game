import React, { Component } from 'react';
import './Game.css';
import CardView from './CardView';
import { connect } from 'react-redux'
import { flipUpCard, checkMatchedPair, initGame } from './actions';

class Game extends Component {
  componentWillMount() {
    setInterval(this.props.onCheckForMatchedPair,5000);
  }

  getCardViews() {
    let cardViews = [];
    let onClick = this.props.onCardClicked;
    this.props.cards.forEach(c => {
      let cardView = <CardView  key={c.id} 
                                id={c.id} 
                                image={c.image}
                                imageUp = {c.imageUp}
                                matched = {c.matched} 
                                onClick={onClick}/>
                                cardViews.push(cardView);
    });
    return cardViews;
  }

  render() {
    let cardViews = this.getCardViews();
    let gameStatus = <div className='Game-status'>
                      <div>Turn: {this.props.turnNo}</div>
                      <div>Pairs found: {this.props.pairsFound}</div>
                    </div>;

    if (this.props.gameComplete) {
      gameStatus = <div className='Game-status'>
                    <div>GAME COMPLETE!</div>
                    <div>You used {this.props.turnNo-1} turns</div>
                    <div><button onClick={this.props.onPlayAgain}>Play again?</button></div></div>;      
    }

    return (
      <div className='Game'>
        <header className='Game-header'>
          <div className='Game-title'>A Memory game in React</div>
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

