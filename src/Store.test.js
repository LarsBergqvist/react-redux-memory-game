import { createStore } from 'redux'
import memoryGame from './reducers'
import { flipUpCard, checkMatchedPair } from './actions';

test('Check number of cards in the game', () => {
  let store = createStore(memoryGame);
  let state = store.getState();
  expect(state.cards.length).toBe(20);
});

test('Test that flipUpCard turns image up', () => {
  let store = createStore(memoryGame);
  expect(store.getState().cards[0].imageUp).toBe(false);
  store.dispatch(flipUpCard(1));
  expect(store.getState().cards[0].imageUp).toBe(true);
});

test('Test that 3rd card flip checks for matches on previous cards and that the 3rd flip is valid', () => {
  let store = createStore(memoryGame);
  store.dispatch(flipUpCard(1));
  store.dispatch(flipUpCard(2));
  store.dispatch(flipUpCard(3));
  // the 3rd flip should trigger match check on previous cards
  expect(store.getState().cards[0].matched).toBe(true);
  expect(store.getState().cards[1].matched).toBe(true);
  // and flipping the 3rd card was valid
  expect(store.getState().cards[2].imageUp).toBe(true);
});

test('Test that pair is found after flipping two cards with same image', () => {
  let store = createStore(memoryGame);
  expect(store.getState().pairsFound).toBe(0);
  // flip the first card
  store.dispatch(flipUpCard(1));
  store.dispatch(checkMatchedPair());
  expect(store.getState().pairsFound).toBe(0);

  // flip the second card (should have same image as the first card)
  store.dispatch(flipUpCard(2));
  store.dispatch(checkMatchedPair());
  expect(store.getState().pairsFound).toBe(1);
  expect(store.getState().cards[0].matched).toBe(true);
  expect(store.getState().cards[1].matched).toBe(true);
  expect(store.getState().cards[0].image).toBe(store.getState().cards[1].image);
});

test('Test that pair is not found after flipping two cards with different images', () => {
  let store = createStore(memoryGame);
  expect(store.getState().pairsFound).toBe(0);
  store.dispatch(flipUpCard(1));
  store.dispatch(flipUpCard(3));
  store.dispatch(checkMatchedPair());
  expect(store.getState().pairsFound).toBe(0);
  expect(store.getState().cards[0].image).not.toBe(store.getState().cards[2].image);
});

test('Test that is game completed after all pairs are found', () => {
  let store = createStore(memoryGame);
  expect(store.getState().gameComplete).toBe(false);

  // Flip the first 9 pairs
  // Should not complete the game
  for(let id=1; id <=18; id=id+2) {
    store.dispatch(flipUpCard(id));
    store.dispatch(flipUpCard(id+1));
    store.dispatch(checkMatchedPair());
    expect(store.getState().gameComplete).toBe(false);  
  }

  // Flip the last pair of cards
  // Should complete the game
  store.dispatch(flipUpCard(19));
  store.dispatch(flipUpCard(20));
  store.dispatch(checkMatchedPair());
  expect(store.getState().gameComplete).toBe(true);
});

test('Test that turnNo is updated', () => {
  let store = createStore(memoryGame);
  expect(store.getState().turnNo).toBe(1);

  // Flip some cards and check that turnNo is updated
  let turnNo=1;
  for(let id=1; id <=18; id=id+2) {
    store.dispatch(flipUpCard(id));
    store.dispatch(flipUpCard(id+1));
    store.dispatch(checkMatchedPair());
    turnNo++;
    expect(store.getState().turnNo).toBe(turnNo);  
  }
});
