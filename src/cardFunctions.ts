export const MAX_PAIRS = 10;
import { Card } from './card';

export function generateCardSet(numPairs: number): Card[] {
    //
    // Generate a set of cards with image pairs
    //
    const cards: Card[] = [];
    let id = 1;
    for (let i = 1; i <= numPairs; i++) {
        const card1: Card = {
            id: id,
            image: i,
            imageUp: false,
            matched: false
        };
        id++;
        const card2: Card = {
            id: id,
            image: i,
            imageUp: false,
            matched: false
        };
        cards.push(card1);
        cards.push(card2);
        id++;
    }

    return cards;
}

export function getCard(id: number, cards: Card[]): Card | undefined {
    return cards.find((c) => c.id === id);
}

export function cardsHaveIdenticalImages(id1: number | undefined, id2: number | undefined, cards: Card[]): boolean {
    if (id1 == null || id2 == null) {
        return false;
    }
    const card1 = getCard(id1, cards);
    const card2 = getCard(id2, cards);
    if (card1 == null || card2 == null) {
        return false;
    }
    if (card1.image === card2.image) {
        return true;
    } else {
        return false;
    }
}
