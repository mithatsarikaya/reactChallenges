"use client";
import { useState } from "react";
import styles from "./tictactoe.module.css";
const TicTacToe = () => {
  const createBlankRow = () => {
    return Array(3).fill("");
  };

  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [board, setBoard] = useState([
    createBlankRow(),
    createBlankRow(),
    createBlankRow(),
  ]);

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
    </main>
  );
};
export default TicTacToe;
