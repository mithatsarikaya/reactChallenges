"use client";
import React, { useState } from "react";
import styles from "./drawcircle.module.css";

const DrawCircle = () => {
  //TODO: undo and redo will added

  type TClickedPositions = { x: number; y: number }[];

  const [clickedPositions, setClickedPositions] = useState<TClickedPositions>(
    []
  );

  function handleDrawingCircle(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    setClickedPositions((prevPos) => [...prevPos, { x: e.pageX, y: e.pageY }]);
    console.log(e.pageX, e.pageY);
  }

  console.log(clickedPositions);

  return (
    <div className={styles.container} onClick={(e) => handleDrawingCircle(e)}>
      {clickedPositions.map((pos, idx) => (
        <div
          key={idx}
          style={{ left: pos.x, top: pos.y }}
          className={styles.circle}
        ></div>
      ))}
    </div>
  );
};

export default DrawCircle;
