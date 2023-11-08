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

  const [cards, setCards] = useState<CardsType>([
    { isClicked: false, isPaired: false, num: 0 },
  ]);
  const [score, setScore] = useState(0);
  useEffect(() => {
    setCards(initialCards);
  }, []);

  //   TODOne: user must only click two of them.
  //   TODOne: add animation to do clicked card
  //   TODOne: when paired, make them visible and disabled

  const showCard = (indexNumber: number) => {
    setCards((prevCards) => {
      console.log(prevCards.filter((card) => card.isClicked).length);
      return prevCards.map((p, idx) =>
        idx == indexNumber && !p.isPaired
          ? { ...p, isClicked: !p.isClicked }
          : p
      );
    });
  };
  const handleCardClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    indexNumber: number
  ) => {
    e.preventDefault();
    // showCard(indexNumber);
    setScore((prevScore) => prevScore + 1);

    //when 2 cards selected and they are not same then on 3rd click show the card and close first 2 cards
    setCards((prevCard) => {
      if (
        prevCard.filter((card) => card.isClicked && !card.isPaired).length > 1
      ) {
        console.log(
          prevCard.filter((card) => card.isClicked && !card.isPaired)
        );
        return prevCard.map((card, idx) =>
          idx != indexNumber && !card.isPaired
            ? { ...card, isClicked: false }
            : { ...card, isClicked: true }
        );
      } else {
        return prevCard.map((p, idx) =>
          idx == indexNumber && !p.isPaired
            ? { ...p, isClicked: !p.isClicked }
            : p
        );
      }
    });
  };

  console.log(cards);

  // const makeAllNotPairedCardUnclicked = () => {
  //   setCards((prevCards) =>
  //     prevCards.map((card) =>
  //       !card.isPaired ? { ...card, isClicked: false } : card
  //     )
  //   );
  // };

  let cardsClickedNotPaired = cards.filter(
    (card) => card.isClicked && !card.isPaired
  );

  let numberCardsClickedNotPaired = cardsClickedNotPaired.length;
  // console.log(numberCardsClickedNotPaired);

  const areChosenTwoCardsSame = () => {
    let firstClickedCardValue = cardsClickedNotPaired[0]?.num;
    return (
      numberCardsClickedNotPaired == 2 &&
      cardsClickedNotPaired.every((card) => card.num == firstClickedCardValue)
    );
  };

  const isPairedSuccesfull = () => {
    if (numberCardsClickedNotPaired == 2 && areChosenTwoCardsSame()) {
      console.log("paired");
      setCards((prevCards) =>
        prevCards.map((card) =>
          !card.isPaired && card.isClicked ? { ...card, isPaired: true } : card
        )
      );
    }
  };
  isPairedSuccesfull();

  let clickedCardClassNames = `${styles.card} ${styles.cardClicked}`;

  // useEffect(() => {
  //   if (numberCardsClickedNotPaired == 2) {
  //     makeAllNotPairedCardUnclicked();
  //   }
  // }, [numberCardsClickedNotPaired]);

  const isGameFinished: boolean = cards
    .map((card) => card.isPaired)
    .every((isPaired) => isPaired);

  const restartTheGame = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setCards(initialCards);
    setScore(0);
  };

  return (
    <main>
      <div className={styles.container}>
        <h1 className={styles.score}>{score}</h1>
        <article className={styles.board}>
          {isGameFinished && (
            <button
              onClick={(e) => restartTheGame(e)}
              className={styles.replayTheGame}
            >
              Game Finished, Play Again?
            </button>
          )}
          {/* state starts with one element, i do not want to show it */}
          {cards.length > 1 &&
            cards.map((card, idx) => (
              <button
                disabled={card.isPaired}
                onClick={(e) => handleCardClick(e, idx)}
                key={idx}
                className={card.isClicked ? clickedCardClassNames : styles.card}
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
