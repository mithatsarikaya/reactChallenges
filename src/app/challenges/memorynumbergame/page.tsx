import styles from "./memorynumbergame.module.css";

const MemoryNumberGame = () => {
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  let showNumbers = Array(4)
    .fill("_")
    .map((_, idx) => numbers[idx]);

  return (
    <main>
      <div className={styles.container}>{showNumbers}</div>
    </main>
  );
};

export default MemoryNumberGame;
