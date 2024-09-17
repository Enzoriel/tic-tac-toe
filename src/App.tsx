import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameReset, setGameReset] = useState(false);

  const handleClick = (index: number) => {
    const newBoard = board.map((cell, i) => {
      if (i === index) {
        return player;
      }
      return cell;
    });

    setBoard(newBoard);
    setPlayer(player === "X" ? "O" : "X");
  };

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setGameOver(true);
      }
    }
  };

  useEffect(() => {
    checkWinner();
  }, [board]);

  useEffect(() => {
    if (gameReset) {
      setBoard(Array(9).fill(null));
      setPlayer("X");
      setWinner(null);
      setGameOver(false);
      setGameReset(false);
    }
  }, [gameReset]);

  useEffect(() => {
    if (winner) {
      setGameOver(true);
    }
  }, [winner]);

  return (
    <>
      <h1>Tic Tac toe</h1>
      <div className="board">
        {gameOver ? (
          <div>
            <p>Ganador: {winner}</p>
            <button onClick={() => setGameReset(true)}>Reset</button>
          </div>
        ) : (
          board.map((cell, index) => (
            <div className="cell" key={index} onClick={() => handleClick(index)}>
              {cell}
            </div>
          ))
        )}
      </div>
      <div>
        <p>Siguiente jugador: X</p>
      </div>
    </>
  );
}

export default App;
