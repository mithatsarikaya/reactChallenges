"use client";
import { useState } from "react";
import styles from "./tictactoe.module.css";
const TicTacToe = () => {
  const createBlankRow = () => {
    return Array(3).fill("");
  };

  let initialBoard = [createBlankRow(), createBlankRow(), createBlankRow()];

  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [board, setBoard] = useState(initialBoard);

  const [mouseClicked, setMouseClicked] = useState(0);
  console.log(board);

  const putXAndOAccordingly = (num: number) => {
    return num % 2 == 0 ? "X" : "O";
  };

  console.log(putXAndOAccordingly(mouseClicked));

  const handlePutLetter = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    rowIDUserClicked: number,
    colIDUserClicked: number
  ) => {
    e.preventDefault();

    setMouseClicked((prevNum) => prevNum + 1);

    setBoard((prevBoard) =>
      prevBoard.map((row, rowID) =>
        rowID == rowIDUserClicked
          ? row.map((col, colID) =>
              colID == colIDUserClicked
                ? putXAndOAccordingly(mouseClicked)
                : col
            )
          : row
      )
    );
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setIsFinished(false);
    setMouseClicked(0);
  };

  return (
    <main className={styles.container}>
      <section className={styles.boxes}>
        {board.map((row, rowIdx) =>
          row.map((squ, colIdx) => (
            <button
              key={colIdx}
              onClick={(e) => handlePutLetter(e, rowIdx, colIdx)}
              className={styles.box}
            >
              {squ}
            </button>
          ))
        )}
      </section>

      <button onClick={handleReset} className={styles.reset}>
        Reset
      </button>
    </main>
  );
};
export default TicTacToe;
