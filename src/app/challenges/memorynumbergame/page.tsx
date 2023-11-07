import styles from "./memorynumbergame.module.css";

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

  return (
    <main>
      <div className={styles.container}>
        <article className={styles.board}>
          {randomNumbersArray.map((num, idx) => (
            <button key={idx} className={styles.card}>
              {num}
            </button>
          ))}
        </article>
      </div>
    </main>
  );
};

export default MemoryNumberGame;
