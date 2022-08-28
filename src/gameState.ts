import { Card } from './card';

export interface GameState {
    turnNo: number;
    pairsFound: number;
    numClicksWithinTurn: number;
    firstId?: number;
    secondId?: number;
    gameComplete: boolean;
    showNumCardsSelection: boolean;
    cards: Card[];
}
