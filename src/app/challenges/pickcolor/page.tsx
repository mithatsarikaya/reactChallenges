"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./pickcolor.module.css";

let colorLetters = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

const PickColor = () => {
  const [questionedColor, setQuestionedColor] = useState<string>("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const getRandomColor = () => {
    let randomColorLetters = new Array(6)
      .fill("")
      .map((a) => colorLetters[Math.floor(Math.random() * colorLetters.length)])
      .join("");
    let hexRandomColorLetters = `#${randomColorLetters}`;

    return hexRandomColorLetters;
  };
  const pickAnAnswer = (answerByUser: string) => {
    if (answerByUser == questionedColor) {
      console.log("you are correct");
      setIsAnswerCorrect(true);

      //TODO: make screen unClickable

      setTimeout(() => {
        refreshThisShit();
      }, 1500);
    } else {
      console.log("wrong");
      setIsAnswerCorrect(false);
    }
  };

  let colorChoices = useMemo(() => {
    return [questionedColor, getRandomColor(), getRandomColor()].sort(
      () => 0.5 - Math.random()
    );
  }, [questionedColor]);

  const refreshThisShit = () => {
    setQuestionedColor(getRandomColor());
    setIsAnswerCorrect(null);
  };

  useEffect(() => {
    setQuestionedColor(getRandomColor());
    setIsAnswerCorrect(null);
  }, []);

  return (
    <main className={styles.container}>
      <button onClick={refreshThisShit}>Refresh this shit</button>
      <div
        style={{ backgroundColor: questionedColor }}
        className={styles.square}
      >
        {questionedColor}
      </div>
      <div className={styles.buttons}>
        {questionedColor &&
          colorChoices.map((colorChoice) => (
            <button onClick={() => pickAnAnswer(colorChoice)}>
              {colorChoice}
            </button>
          ))}
      </div>
      {isAnswerCorrect !== null ? (
        <div>
          {isAnswerCorrect ? (
            <p className={styles.correctAnswer}>Correct Answer</p>
          ) : (
            <p className={styles.wrongAnswer}>Wrong Answer</p>
          )}
        </div>
      ) : (
        <p className={styles.pickAcolor}>Pick A Color</p>
      )}
    </main>
  );
};

export default PickColor;
