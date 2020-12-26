function GameStatusView(props) {
    if (props.gameComplete) {
        return <div>
            <div>GAME COMPLETE!</div>
            <div>You used {props.turnNo - 1} turns</div>
            <div><button className='Game-button' onClick={props.onShowNumCardsSelection}>Play again?</button></div>
        </div>;
    } else {
        return <div>
            Turn: {props.turnNo}   Pairs found: {props.pairsFound}
            <button className='Game-button' onClick={props.onShowNumCardsSelection}>NEW GAME</button>
        </div>;
    }
}

export default GameStatusView;
