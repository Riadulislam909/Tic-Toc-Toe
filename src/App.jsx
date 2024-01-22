import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="bg-slate-400 border rounded border-gray-800 h-14 w-14 m-1 leading-9 text-lg decoration-4"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculatedWinner(squares);
  let status;
  if (winner) {
    status = `Congratulation! Winner is ${winner}`;
  } else {
    status = `Next Player is: ` + (xIsNext ? "X" : "O");
  }

  function handleClick(index) {
    if (squares[index] || winner) {
      return null;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }
    onPlay(nextSquares);
  }

  function calculatedWinner(squares) {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <>
      <div className="text-4xl font-semibold text-sky-700 flex justify-center items-center mt-8">
        Tic Toc Toe Game 😂
      </div>
      <div className="text-2xl font-semibold text-fuchsia-500 flex justify-center items-center mt-2">
        {status}
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <div className="flex">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="flex">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="flex">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentHistory = history[currentMove];

  function handlePlay(nextSquares) {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  let moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move no # ${move}`;
    } else {
      description = `Please start the Game!`;
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }

  return (
    <div>
      <div>
        <Board xIsNext={xIsNext} squares={currentHistory} onPlay={handlePlay} />
      </div>
      <div className="text-2xl  text-sky-700 flex justify-center items-center mt-2">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
