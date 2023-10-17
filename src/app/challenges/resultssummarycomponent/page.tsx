import styles from "./resultssummarycomponent.module.css";
import data from "@/statics/staticsForChallenges/resultssummarycomponent/data.json";

const ResultsSummaryComponent = () => {
  return (
    <div className={styles.container}>
      <section className={styles.resultSection}>
        <p>Your Result</p>
        <div className={styles.resultSummary}>
          <h1>76</h1>
          <p>of 100</p>
        </div>
        <p>Great</p>
        <p className={styles.resultDesc}>
          You scored higher than 65% of the people who have taken these tests.
        </p>
      </section>
      <section className={styles.summarySection}>
        <p>Summary</p>
        <div className={styles.skills}></div>
      </section>
    </div>
  );
};

export default ResultsSummaryComponent;
