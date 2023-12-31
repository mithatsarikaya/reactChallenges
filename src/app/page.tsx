import styles from "./page.module.css";
import Header from "./components/Header/Header";
import Challlenges from "./components/Challenges/Challenges";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Header />
      <Challlenges />
    </div>
  );
}
