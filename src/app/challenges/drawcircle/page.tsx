"use client";
import styles from "./drawcircle.module.css";
import React, { useState } from "react";

const DrawCircle = () => {
  //TODO: undo and redo will added

  type TClickedPositions = TClickedObject[];
  type TClickedObject = { x: number; y: number };

  const [clickedPositions, setClickedPositions] = useState<TClickedPositions>(
    []
  );

  const [undoPositions, setUndoPositions] = useState<TClickedPositions>([]);

  function handleDrawingCircle(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    setClickedPositions((prevPos) => [...prevPos, { x: e.pageX, y: e.pageY }]);
  }

  function undoLastClicked(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();
    const newPoints = [...clickedPositions];
    let undoPoint = newPoints.pop() as TClickedObject;
    console.log({ undoPoint });
    setUndoPositions((prevPos) => [...prevPos, undoPoint]);
    setClickedPositions(newPoints);
  }
  console.count("render");
  console.log({ undoPositions });

  function resetClickedPositionList(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation();
    setClickedPositions([]);
    setUndoPositions([]);
  }
  function redoLastUndo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    let undoPoints = [...undoPositions];
    let redoPoint = undoPoints.pop() as TClickedObject;
    setClickedPositions((prevPos) => [...prevPos, redoPoint]);
    setUndoPositions(undoPoints);
  }

  let isClickedPositionsListEmpty = clickedPositions.length == 0;
  let isRedolistEmpty = undoPositions.length == 0;

  return (
    <div className={styles.container} onClick={(e) => handleDrawingCircle(e)}>
      {clickedPositions.map((pos, idx) => (
        <div
          key={idx}
          style={{ left: pos.x, top: pos.y }}
          className={styles.circle}
        >
          {idx}
        </div>
      ))}

      <button
        disabled={isClickedPositionsListEmpty}
        onClick={(e) => undoLastClicked(e)}
        className={styles.btn}
      >
        Undo
      </button>
      <button
        onClick={redoLastUndo}
        disabled={isRedolistEmpty}
        className={styles.btn}
      >
        Redo
      </button>
      <button
        onClick={(e) => resetClickedPositionList(e)}
        className={styles.btn}
      >
        Reset
      </button>
    </div>
  );
};

export default DrawCircle;
