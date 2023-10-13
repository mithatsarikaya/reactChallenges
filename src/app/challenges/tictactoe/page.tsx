"use client";
import { useEffect, useState } from "react";
import styles from "./tictactoe.module.css";
const TicTacToe = () => {
  const createBlankRow = () => {
    return Array(3).fill("");
  };

  let initialBoard = [createBlankRow(), createBlankRow(), createBlankRow()];

  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [board, setBoard] = useState(initialBoard);

  const [mouseClicked, setMouseClicked] = useState(0);

  const putXAndOAccordingly = (num: number) => {
    return num % 2 == 0 ? "X" : "O";
  };

  const handlePutLetter = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    rowIDUserClicked: number,
    colIDUserClicked: number
  ) => {
    e.preventDefault();

    if (!isFinished) {
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
    }
  };

  let winByRow: boolean = board
    .map((row) => row.map((cell) => row.every((ro) => ro == cell && ro != "")))
    .map((row) => row.every((cell) => cell == true))
    .some(Boolean);

  // let boardForLearning = [
  //   [0, 0, 0],
  //   [1, 1, 1],
  //   [2, 2, 2],
  // ];

  const winByColumn = () => {
    let newBoard = board.map((row, idx) =>
      row.map((cell, colIdx) => board[colIdx][idx])
    );

    return newBoard
      .map((row) =>
        row.map((cell) => row.every((ro) => ro == cell && ro != ""))
      )
      .map((row) => row.every((cell) => cell == true))
      .some(Boolean);
  };

  // console.log("herewinbycvolş", winByColumn());

  const winByDiagonal = () => {
    let newBoard = [
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];
    return newBoard
      .map((row) =>
        row.map((cell) => row.every((ro) => ro == cell && ro != ""))
      )
      .map((row) => row.every((cell) => cell == true))
      .some(Boolean);
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setIsFinished(false);
    setMouseClicked(0);
  };

  useEffect(() => {
    (winByDiagonal() || winByColumn() || winByRow) && setIsFinished(true);
  }, [mouseClicked]);

  console.log({ isFinished });

  return (
    <main className={styles.container}>
      {isFinished && "finished"}
      <section className={styles.boxes}>
        {board.map((row, rowIdx) =>
          row.map((squ, colIdx) => (
            <button
              key={colIdx}
              onClick={(e) => handlePutLetter(e, rowIdx, colIdx)}
              className={styles.box}
            >
              {squ}
              {/* {rowIdx} {colIdx} */}
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
