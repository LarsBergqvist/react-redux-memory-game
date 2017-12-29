import { FLIP_UP_CARD, SHUFFLE_CARDS, CHECK_MATCHED_PAIR, markPairAsMatched, 
        MARK_PAIR_AS_MATCHED, flipDownPair, FLIP_DOWN_PAIR, INIT_GAME, 
        shuffleCards, checkMatchedPair, flipUpCard } from "./actions";
import shuffle from 'shuffle-array';
import { NUM_IMAGES, generateCardSet, getCard, cardsHaveIdenticalImages } from './cardFunctions';

const initialState = {
  turnNo : 1,
  pairsFound : 0,
  numClicksWithinTurn : 0,
  firstId : undefined,
  secondId : undefined,
  gameComplete: false,
  cards: generateCardSet()
};

// The reducer for the memory card array
// state is an array of cards
function memoryCards(state = [], action) {
  switch (action.type) {
    case FLIP_UP_CARD:
      return state.map((card) => {
        if (action.id === card.id) {
          return Object.assign({}, card, {
            imageUp: true
          });
        }
        return card;
      });
    
    case MARK_PAIR_AS_MATCHED:
      return state.map((card) => {
        if (action.id1 === card.id || action.id2 === card.id) {
          return Object.assign({}, card, {
            matched: true
          })
        }
        return card;
      });
    
    case FLIP_DOWN_PAIR:
      return state.map((card) => {
        if (action.id1 === card.id || action.id2 === card.id) {
          return Object.assign({}, card, {
            imageUp: false
          })
        }
        return card;
      });
    
    case SHUFFLE_CARDS:
      let newCards = [...state];
      newCards = shuffle(newCards);
      return newCards;
    
    default:
      return state;
  }
}

// The reducer for the game
// state is an object with game state and an array of cards
function memoryGame(state = initialState, action) {
  switch (action.type) {
    case INIT_GAME:
      return Object.assign({}, initialState, { cards: memoryCards(initialState.cards, shuffleCards()) } );
    
    case CHECK_MATCHED_PAIR:
      if (state.numClicksWithinTurn === 2 && cardsHaveIdenticalImages(state.firstId, state.secondId, state.cards)) {
        // PAIR MATCHED
        let pairsFound = state.pairsFound + 1;
        let gameComplete = false;
        if (pairsFound === NUM_IMAGES) {
          gameComplete = true;
        }
        return Object.assign({}, state, { 
          pairsFound: pairsFound,
          turnNo: state.turnNo + 1,
          numClicksWithinTurn: 0,
          gameComplete: gameComplete, 
          cards: memoryCards(state.cards, markPairAsMatched(state.firstId, state.secondId)) } );      
      } else if (state.numClicksWithinTurn === 2) {
        // PAIR DID NOT MATCH
        return Object.assign({}, state, { 
          numClicksWithinTurn: 0,
          turnNo: state.turnNo + 1, 
          cards: memoryCards(state.cards, flipDownPair(state.firstId, state.secondId)) } );              
      }
      return state;
    
    case FLIP_UP_CARD:
      if (state.numClicksWithinTurn === 2)
      {
        // Two cards are already flipped
        // Check for match and trigger a new flip
        let s = memoryGame(state, checkMatchedPair());
        return memoryGame(s, flipUpCard(action.id));
      }

      let card = getCard(action.id, state.cards);
      if (card.imageUp || card.matched) {        
        return state;
      }

      let firstId = state.firstId;
      let secondId = state.secondId;
      if (state.numClicksWithinTurn === 0) {
        firstId = action.id;
      } else {
        secondId = action.id;
      }
      let numClicks = state.numClicksWithinTurn + 1;

      return Object.assign({}, state, { 
        firstId: firstId, 
        secondId: secondId, 
        numClicksWithinTurn : numClicks,
        cards: memoryCards(state.cards, action) } );    
    
    case SHUFFLE_CARDS:
      return Object.assign({}, state, { cards: memoryCards(state.cards, action) } );
    
    default:
      return state;
  }
}

export default memoryGame;
