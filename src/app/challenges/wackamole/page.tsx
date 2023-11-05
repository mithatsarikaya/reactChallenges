"use client";
import { useEffect, useState } from "react";
import styles from "./wackamole.module.css";

let moleUrl = "/wackamole/mole.png";
let holeUrl = "/wackamole/hole.png";
let initialState = Array(9)
  .fill({})
  .map((_, idx) => ({ id: idx, isHole: true }));

const WackAMole = () => {
  const [cells, setCells] = useState(initialState);

  const showRandomMole = (numberToChange: number) => {
    setCells((prevCells) =>
      prevCells.map((cell) =>
        cell.id == numberToChange ? { ...cell, isHole: !cell.isHole } : cell
      )
    );
  };

  const getRandomNumberFromOnlyHoles = () => {
    let holeIDs = cells.filter((cell) => cell.isHole).map((cell) => cell.id);
    return holeIDs[Math.floor(Math.random() * holeIDs.length)];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      //   let randomNumber = Math.floor(Math.random() * cells.length);
      showRandomMole(getRandomNumberFromOnlyHoles());
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [cells]);

  console.log("checkrender");

  return (
    <main>
      <div className={styles.container}>
        <h1 className={styles.score}>Score 0</h1>
        <article className={styles.photosContainer}>
          {cells.map((cell) => (
            <img key={cell.id} src={cell.isHole ? holeUrl : moleUrl} alt="" />
          ))}
        </article>
      </div>
    </main>
  );
};

export default WackAMole;
