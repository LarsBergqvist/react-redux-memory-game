import { FLIP_UP_CARD, SHUFFLE_CARDS, CHECK_MATCHED_PAIR, markPairAsMatched, 
        MARK_PAIR_AS_MATCHED, flipDownPair, FLIP_DOWN_PAIR, INIT_GAME, shuffleCards } from "./actions";
import shuffle from 'shuffle-array';

const NUM_IMAGES = 10;

const initialState = {
  turnNo : 1,
  pairsFound : 0,
  numClicksWithinTurn : 0,
  firstId : undefined,
  secondId : undefined,
  gameComplete: false,
  cards: generateCardSet()
};

function generateCardSet() {
  //
  // Generate a set of cards with image pairs
  //

  let cards = [];
  let id=1;
  for(let i=1; i <= NUM_IMAGES; i++) {
    let card1 = {
      id: id,
      image : i,
      imageUp: false,
      matched: false
    };
    id++;
    let card2 = {
      id: id,
      image : i,
      imageUp: false,
      matched: false
    };
    cards.push(card1);
    cards.push(card2);
    id++;
  }

  return cards;
};

function getCard(id,cards) {
  for(let i=0; i < 2*NUM_IMAGES; i++) {
    if (cards[i].id === id) {
      return cards[i];
    }
  };
}

function cardsHaveIdenticalImages(id1, id2, cards) {
  if (getCard(id1, cards).image === getCard(id2, cards).image) {
    return true;
  } else {
    return false;
  }
}

// state is an array of cards
function memoryCards(state = [], action) {
  switch (action.type) {
    case FLIP_UP_CARD:
      return state.map((card) => {
        if (action.id === card.id) {
          return Object.assign({}, card, {
            imageUp: true
          })
        }
        return card
      })
    case MARK_PAIR_AS_MATCHED:
      return state.map((card) => {
        if (action.id1 === card.id || action.id2 === card.id) {
          return Object.assign({}, card, {
            matched: true
          })
        }
        return card
      })  
    case FLIP_DOWN_PAIR:
      return state.map((card) => {
        if (action.id1 === card.id || action.id2 === card.id) {
          return Object.assign({}, card, {
            imageUp: false
          })
        }
        return card
      })    
    case SHUFFLE_CARDS:
      let newCards = [...state];
      newCards = shuffle(newCards);
      return newCards;
    default:
      return state
  }
}


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
        return state;
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
      return state
  }
}

export default memoryGame;
