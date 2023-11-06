"use client";
import { MouseEvent, useEffect, useState } from "react";
import styles from "./wackamole.module.css";

let moleUrl = "/wackamole/mole.png";
let holeUrl = "/wackamole/hole.png";
let initialState = Array(9)
  .fill({})
  .map((_, idx) => ({ id: idx, isHole: true }));

const WackAMole = () => {
  const [cells, setCells] = useState(initialState);
  const [score, setScore] = useState(0);
  const [isLost, setIsLost] = useState(false);

  const showRandomMole = (numberToChange: number) => {
    setCells((prevCells) =>
      prevCells.map((cell) =>
        cell.id == numberToChange ? { ...cell, isHole: !cell.isHole } : cell
      )
    );
  };

  const hideTheMole = (idToHide: number) => {
    setCells((prevCells) =>
      prevCells.map((cell) =>
        cell.id == idToHide ? { ...cell, isHole: true } : cell
      )
    );
  };

  const getRandomNumberFromOnlyHoles = () => {
    let holeIDs = cells.filter((cell) => cell.isHole).map((cell) => cell.id);
    return holeIDs[Math.floor(Math.random() * holeIDs.length)];
  };

  const incrementScore = () => {
    setScore((prev) => prev + 1);
  };

  const checkIfNoHole = () => {
    return cells.map((cell) => cell.isHole).every((hole) => !hole);
  };

  const handleHitMole = (cell: (typeof cells)[0]) => {
    if (!cell.isHole) {
      hideTheMole(cell.id);
      incrementScore();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      //   let randomNumber = Math.floor(Math.random() * cells.length);

      !checkIfNoHole() &&
        !isLost &&
        showRandomMole(getRandomNumberFromOnlyHoles());
    }, 750);

    checkIfNoHole() && setIsLost(true);

    return () => {
      clearInterval(interval);
    };
  }, [cells]);

  console.log("checkrender");

  const handleRestart = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setScore(0);
    setIsLost(false);
    setCells(initialState);
  };

  return (
    <main>
      <div className={styles.container}>
        <h1 className={styles.score}>Score {score}</h1>
        <article className={styles.photosContainer}>
          {isLost && (
            <button
              onClick={(e) => handleRestart(e)}
              className={styles.againButton}
            >
              You Lost, Play Again?
            </button>
          )}
          {cells.map((cell) => (
            <img
              className={styles.photo}
              onClick={(e) => handleHitMole(cell)}
              key={cell.id}
              src={cell.isHole ? holeUrl : moleUrl}
              alt=""
            />
          ))}
        </article>
      </div>
    </main>
  );
};

export default WackAMole;
