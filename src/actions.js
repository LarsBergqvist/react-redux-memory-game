export const FLIP_UP_CARD = 'FLIP_UP_CARD';
export const SHUFFLE_CARDS = 'SHUFFLE_CARDS';
export const CHECK_UNMATCHED_PAIR = 'CHECK_UNMATCHED_PAIR';
export const CHECK_MATCHED_PAIR = 'CHECK_MATCHED_PAIR';
export const MARK_PAIR_AS_MATCHED = 'MARK_PAIR_AS_MATCHED';
export const FLIP_DOWN_PAIR = 'FLIP_DOWN_PAIR';
export const INIT_GAME = 'INIT_GAME';
export const GENERATE_PAIRS = 'GENERATE_PAIRS';
export const SHOW_NUM_CARDS_SELECTION = 'SHOW_NUM_CARDS_SELECTION';

export function showNumCardsSelection() {
    return { type: SHOW_NUM_CARDS_SELECTION };
}

export function generatePairs(numPairs) {
    return { type: GENERATE_PAIRS, numPairs: numPairs };
}

export function initGame(numPairs) {
    return { type: INIT_GAME, numPairs: numPairs };
}

export function flipDownPair(id1, id2) {
    return { type: FLIP_DOWN_PAIR, id1: id1, id2: id2 }
}
export function markPairAsMatched(id1, id2) {
    return { type: MARK_PAIR_AS_MATCHED, id1: id1, id2: id2 }
}

export function checkUnmatchedPair() {
    return { type: CHECK_UNMATCHED_PAIR };
}

export function checkMatchedPair() {
    return { type: CHECK_MATCHED_PAIR };
}

export function flipUpCard(id) {
    return { type: FLIP_UP_CARD, id };
}

export function shuffleCards() {
    return { type: SHUFFLE_CARDS };
}
