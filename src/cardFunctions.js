export const NUM_IMAGES = 10;

export function generateCardSet() {
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

export function getCard(id, cards) {
  for(let i=0; i < 2*NUM_IMAGES; i++) {
    if (cards[i].id === id) {
      return cards[i];
    }
  };
}

export function cardsHaveIdenticalImages(id1, id2, cards) {
  if (getCard(id1, cards).image === getCard(id2, cards).image) {
    return true;
  } else {
    return false;
  }
}
