"use client";
import { useState } from "react";
import styles from "./tictactoe.module.css";
const TicTacToe = () => {
  const createBlankRow = () => {
    return Array(3).fill("");
  };
  const [board, setBoard] = useState([
    createBlankRow(),
    createBlankRow(),
    createBlankRow(),
  ]);

  const [mouseClicked, setMouseClicked] = useState(0);
  console.log(board);

  return (
    <main className={styles.container}>
      <section className={styles.boxes}>
        {board.map((row) =>
          row.map((squ) => <button className={styles.box}></button>)
        )}
        {/* <button className={styles.box}></button>
        <button className={styles.box}></button>
        <button className={styles.box}></button>
        <button className={styles.box}></button>
        <button className={styles.box}></button>
        <button className={styles.box}></button>
        <button className={styles.box}></button>
        <button className={styles.box}></button> */}
      </section>
    </main>
  );
};
export default TicTacToe;
