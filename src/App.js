import { useState } from 'react';
import Board from './components/Board';
import Toggle from './components/Toggle';
import './App.css';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill('_')]);
  const [locationHistory, setLocationHistory] = useState(Array(9).fill('-1'));
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares, location) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);

    const nextLocationHistory = [...locationHistory.slice(0, currentMove + 1), location];
    setLocationHistory(nextLocationHistory);

    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      let col = locationHistory[move] % 3, row = (locationHistory[move] - col) / 3;
      let player = move % 2 === 0 ? 'O' : 'X';
      description = 'Move #' + move + ' : ' + player + ' at (' + row + ',' + col + ')';
    } else {
      description = 'Game start';
    }

    let [winner, ..._points] = calculateWinner(squares);

    return (
      <>
        <li key={move}>
          {move !== currentMove && <button onClick={() => jumpTo(move)}>{description}</button>}
          {move === currentMove && <div>{description}</div>}
        </li>

        {(move === 9 || winner) && <button onClick={() => jumpTo(0)}>{'Go to game start'}</button>}
      </>
    );
  });

  const [toggle, setToggle] = useState(true);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="game">
      <Toggle toggle={toggle} handleToggleChange={() => handleToggle()} />
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}
          calculateWinner={calculateWinner} checkFull={checkFull} />
      </div>
      <div className="game-info">
        {(toggle && (<ol>{moves}</ol>)) || (<ol>{moves.reverse()}</ol>)}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] !== '_' && squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]];
    }
  }
  return [null, [null, null, null]];
}

function checkFull(squares) {
  let count = 9;

  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === '_') count--;
  }

  return (count === squares.length);
}