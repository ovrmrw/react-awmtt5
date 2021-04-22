import React from "react";

export default function MoveButton(props) {
  return (
    <button onClick={props.move}>
      {props.index === 0 ? "初期状態に戻す" : props.index + "手後に戻す"}
    </button>
  );
}
