import styles from "./memorynumbergame.module.css";

const MemoryNumberGame = () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const BOARDSIZE = 16;

  let randomNumbersArray = [];

  for (let num = 0; num < BOARDSIZE; num++) {
    const element = numbers[Math.floor(Math.random() * numbers.length)];
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
