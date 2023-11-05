import styles from "./wackamole.module.css";

const WackAMole = () => {
  return (
    <main>
      <div className={styles.container}>
        <h1 className={styles.score}>Score 0</h1>
      </div>
    </main>
  );
};

export default WackAMole;
