import logo from "./logo.svg";
import "./App.css";
import styled from "@emotion/styled";
import { useState } from "react";

const Cell = styled.div`
  width: 100%;
  height: 80px;
  background-color: gainsboro;
  border: 3px solid black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  cursor: pointer;
  &:hover {
    background-color: brown;
  }
`;

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 240px;
  /* background-color: white; */
  grid-row-gap: 16px;
  grid-column-gap: 16px;
  margin: auto;
`;

const GameButton = styled.button`
  width: 240px;
  margin: auto;
  height: 32px;
  margin-top: 16px;
`;

const winStates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

const calculateWinner = (gameState) => {
  let winner;
  // calculate
  for (let i = 0; i < winStates.length; i++) {
    const winState = winStates[i]; // [0,1,2]
    if (
      gameState[winState[0]] === gameState[winState[1]] &&
      gameState[winState[1]] === gameState[winState[2]] &&
      Boolean(gameState[winState[0]])
    ) {
      winner = gameState[winState[0]];
    }
  }

  return winner;
};

function App() {
  const [gameState, setGameState] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [player, setPlayer] = useState("X");
  const winner = calculateWinner(gameState);
  const isTie =
    !winner && gameState.filter((state) => Boolean(state)).length === 9;

  const onCellClick = (index) => {
    if (gameState[index] !== "" || Boolean(winner) || isTie) {
      return;
    }
    const newGameState = [...gameState];
    newGameState[index] = player;
    setGameState(newGameState);
    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  };

  const restartGame = () => {
    setGameState(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
  };

  return (
    <div
      className="App"
      style={{ backgroundColor: "gray", height: "100vh", padding: 16 }}
    >
      <h1>Tic Tac Toe</h1>
      {winner ? (
        <h2>Congrat {winner} is win</h2>
      ) : isTie ? (
        <h2>Game is Tie</h2>
      ) : (
        <h2>Player {player}, It's your turn</h2>
      )}

      <BoardContainer>
        {gameState.map((cellNumber, index) => {
          return <Cell onClick={() => onCellClick(index)}>{cellNumber}</Cell>;
        })}
      </BoardContainer>
      <GameButton onClick={() => restartGame()}>Restart</GameButton>
    </div>
  );
}

export default App;
