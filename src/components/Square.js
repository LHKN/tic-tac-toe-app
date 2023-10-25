export default function Square({ value, onSquareClick, isWinningSquare }) {
    return (
        <button className="square" onClick={onSquareClick}
            style={isWinningSquare ? { backgroundColor: "yellow" } : { backgroundColor: "white" }}
        >
            {value}
        </button>
    );
}