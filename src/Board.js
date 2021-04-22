import React, { useState, useEffect } from "react";

import Square from "./Square";

export default function Board(props) {
  const { squares, mark } = useBoardService(props);

  return (
    <div>
      <div className="board-row">
        <Square value={squares[0]} mark={() => mark(0)} />
        <Square value={squares[1]} mark={() => mark(1)} />
        <Square value={squares[2]} mark={() => mark(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} mark={() => mark(3)} />
        <Square value={squares[4]} mark={() => mark(4)} />
        <Square value={squares[5]} mark={() => mark(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} mark={() => mark(6)} />
        <Square value={squares[7]} mark={() => mark(7)} />
        <Square value={squares[8]} mark={() => mark(8)} />
      </div>
    </div>
  );
}

export function useBoardService(props) {
  const [squares, setSquares] = useState([]);

  const mark = index => {
    if (!props.result && !squares[index]) {
      props.addHistory(index);
    }
  };

  useEffect(() => {
    setSquares(props.getCurrentHistory().squares);
  });

  return { squares, mark };
}
