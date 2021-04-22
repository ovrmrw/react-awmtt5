import React, { useState, useEffect } from "react";

import Board from "./Board";
import MoveButton from "./MoveButton";

export default function Game(props) {
  const {
    state,
    getCurrentSquares,
    addHistory,
    initState,
    setGame
  } = useGameService(props);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          result={state.result}
          getCurrentSquares={getCurrentSquares}
          addHistory={addHistory}
        />
      </div>
      <div className="game-info">
        <button onClick={initState}>New Game</button>
        <div>{state.status}</div>
        {!state.result &&
          state.history.slice(0, state.history.length - 1).map((_, index) => (
            <ol key={index}>
              <MoveButton index={index} move={() => setGame(index)} />
            </ol>
          ))}
      </div>
    </div>
  );
}

export function useGameService(props) {
  const players = ["A", "B"];
  const initialState = {
    history: [{ squares: Array(9).fill(null) }],
    status: "",
    result: null
  };
  const [state, setState] = useState({ ...initialState });

  const initState = () => {
    setState({ ...initialState });
  };

  const setGame = historyIndex => {
    setState({
      ...state,
      history: state.history.slice(0, historyIndex + 1)
    });
  };

  const getPlayer = () =>
    state.history.length % 2 === 1 ? players[0] : players[1];

  const getCurrentHistory = () => state.history[state.history.length - 1];

  const getCurrentSquares = () =>
    state.result ? state.result.squares : getCurrentHistory().squares;

  const addHistory = squareIndex => {
    const squares = getCurrentHistory().squares.slice();
    squares[squareIndex] = getPlayer();
    setState({
      ...state,
      history: [...state.history, { squares }]
    });
  };

  useEffect(() => {
    setState({
      ...state,
      status: getPlayer() + "のターン"
    });

    const winner = calculateWinner(getCurrentHistory().squares);
    if (winner) {
      const squares = getCurrentHistory().squares.slice();
      setState({
        ...state,
        result: { winner, squares }
      });
    }
  }, [state.history]);

  useEffect(() => {
    if (state.result) {
      setState({
        ...state,
        status: state.result.winner + "の勝ち"
      });
    }
  }, [state.result]);

  return { state, getCurrentSquares, addHistory, initState, setGame };
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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
