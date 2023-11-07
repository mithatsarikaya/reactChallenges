"use client";
import { MouseEvent, useEffect, useState } from "react";
import styles from "./memorynumbergame.module.css";

type CardsType = {
  num: number;
  isPaired: boolean;
  isClicked: boolean;
}[];

const MemoryNumberGame = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  const BOARDSIZE = 16;

  let randomNumbersArray = [];

  const isNumberAlreadyExistTwoTimes = (num: number, numArray: number[]) => {
    return numArray.filter((n) => n == num).length == 2;
  };

  let getRandomNumberFromNumbersArray = () =>
    numbers[Math.floor(Math.random() * numbers.length)];

  for (let num = 0; num < BOARDSIZE; num++) {
    let element = getRandomNumberFromNumbersArray();
    //repick if number is exist 2 times already
    while (isNumberAlreadyExistTwoTimes(element, randomNumbersArray)) {
      element = getRandomNumberFromNumbersArray();
    }
    randomNumbersArray.push(element);
  }

  let initialCards = randomNumbersArray.map((card) => ({
    num: card,
    isPaired: false,
    isClicked: false,
  }));

  const [cards, setCards] = useState<CardsType | null>(null);
  useEffect(() => {
    setCards(initialCards);
  }, []);

  //   TODO: user must only click two of them.
  //   TODO: add animation to do clicked card
  //   TODO: when paired, make them visible and disabled
  const handleCardClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    indexNumber: number
  ) => {
    e.preventDefault();
    console.log("hi");
    setCards((prevCards) =>
      prevCards.map((p, idx) =>
        idx == indexNumber ? { ...p, isClicked: !p.isClicked } : p
      )
    );
  };

  return (
    <main>
      <div className={styles.container}>
        <article className={styles.board}>
          {cards &&
            cards.map((card, idx) => (
              <button
                style={{
                  backgroundColor: `${card.isClicked ? "red" : "white"}`,
                }}
                onClick={(e) => handleCardClick(e, idx)}
                key={idx}
                className={styles.card}
              >
                {card.num}
              </button>
            ))}
        </article>
      </div>
    </main>
  );
};

export default MemoryNumberGame;
