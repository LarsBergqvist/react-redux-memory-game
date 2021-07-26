import {
    GENERATE_PAIRS, FLIP_UP_CARD, SHUFFLE_CARDS, CHECK_UNMATCHED_PAIR, markPairAsMatched,
    MARK_PAIR_AS_MATCHED, flipDownPair, FLIP_DOWN_PAIR, INIT_GAME,
    shuffleCards, checkUnmatchedPair, checkMatchedPair, generatePairs, SHOW_NUM_CARDS_SELECTION, CHECK_MATCHED_PAIR
} from './actions';
import shuffle from 'shuffle-array';
import { generateCardSet, getCard, cardsHaveIdenticalImages } from './cardFunctions';

const initialState = {
    turnNo: 1,
    pairsFound: 0,
    numClicksWithinTurn: 0,
    firstId: undefined,
    secondId: undefined,
    gameComplete: false,
    showNumCardsSelection: false,
    cards: []
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

        case GENERATE_PAIRS:
            return generateCardSet(action.numPairs);

        case SHUFFLE_CARDS: {
            let newCards = [...state];
            newCards = shuffle(newCards);
            return newCards;
        }

        default:
            return state;
    }
}

// The reducer for the game
// state is an object with game state and an array of cards
function memoryGame(state = initialState, action) {
    switch (action.type) {
        case SHOW_NUM_CARDS_SELECTION:
            return Object.assign({}, initialState, { showNumCardsSelection: true });

        case GENERATE_PAIRS:
            return Object.assign({}, initialState, { cards: memoryCards(initialState.cards, generatePairs(action.numPairs)) });

        case INIT_GAME: {
            const cards = memoryCards(initialState.cards, generatePairs(action.numPairs));
            return Object.assign({}, initialState, { showNumCardsSelection: false, cards: memoryCards(cards, shuffleCards()) });
        }

        case CHECK_UNMATCHED_PAIR: {
            if (state.numClicksWithinTurn === 2 && !cardsHaveIdenticalImages(state.firstId, state.secondId, state.cards)) {
                // PAIR DID NOT MATCH
                return Object.assign({}, state, {
                    numClicksWithinTurn: 0,
                    firstId: undefined,
                    secondId: undefined,
                    turnNo: state.turnNo + 1,
                    cards: memoryCards(state.cards, flipDownPair(state.firstId, state.secondId))
                });
            }
            return state;
        }

        case CHECK_MATCHED_PAIR: {
            if (state.numClicksWithinTurn === 2 && cardsHaveIdenticalImages(state.firstId, state.secondId, state.cards)) {
                // PAIR MATCHED
                const pairsFound = state.pairsFound + 1;
                let gameComplete = false;
                if (pairsFound === state.cards.length / 2) {
                    gameComplete = true;
                }
                return Object.assign({}, state, {
                    pairsFound,
                    turnNo: state.turnNo + 1,
                    numClicksWithinTurn: 0,
                    gameComplete,
                    cards: memoryCards(state.cards, markPairAsMatched(state.firstId, state.secondId))
                });
            }
            return state;
        }

        case FLIP_UP_CARD: {
            const card = getCard(action.id, state.cards);
            if (card.imageUp || card.matched) {
                // Selected an already flipped card
                // or a card that has already been matched
                return state;
            }

            if (state.numClicksWithinTurn === 2) {
                // Two cards are already flipped
                // Check for match/unmatch and trigger a new flip
                const s1 = memoryGame(state, checkMatchedPair());
                const s2 = memoryGame(s1, checkUnmatchedPair());
                return Object.assign({}, s2, { firstId: action.id, numClicksWithinTurn: 1 }, { cards: memoryCards(s2.cards, action) });
            }

            let firstId = state.firstId;
            let secondId = state.secondId;
            if (state.numClicksWithinTurn === 0) {
                firstId = action.id;
            } else {
                secondId = action.id;
            }
            const numClicks = state.numClicksWithinTurn + 1;

            return Object.assign({}, state, {
                firstId,
                secondId,
                numClicksWithinTurn: numClicks,
                cards: memoryCards(state.cards, action)
            });
        }

        case SHUFFLE_CARDS:
            return Object.assign({}, state, { cards: memoryCards(state.cards, action) });

        default:
            return state;
    }
}

export default memoryGame;
