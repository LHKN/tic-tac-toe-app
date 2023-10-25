import Square from './Square';

export default function Board({ xIsNext, squares, onPlay, calculateWinner, checkFull }) {
    let [winner, [a, b, c]] = calculateWinner(squares);

    function handleClick(i) {
        if (winner || squares[i] !== '_') {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares, i);
    }

    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else if (checkFull(squares)) {
        status = "Draw";
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    // function
    function MoveSquare({ index }) {
        let isWinningSquare = (index === a || index === b || index === c);
        return <Square value={squares[index]} onSquareClick={() => handleClick(index)}
            isWinningSquare={isWinningSquare}
        />;
    }

    var length = 3;

    return (
        <>
            <div className="status">{status}</div>
            {/* <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div> */}

            <div className="board">
                {[...new Array(length)].map((_index, rowIndex) => (
                    <div className="board-row" key={rowIndex}>
                        {[...new Array(length)].map((_index, colIndex) => (
                            <MoveSquare key={rowIndex * length + colIndex} index={rowIndex * length + colIndex} />
                            // <Square key={rowIndex * length + colIndex} 
                            // value={squares[rowIndex * length + colIndex]} 
                            // onSquareClick={() => handleClick(rowIndex * length + colIndex)} />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}