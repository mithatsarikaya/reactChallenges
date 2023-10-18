import styles from "./resultssummarycomponent.module.css";
import data from "@/statics/staticsForChallenges/resultssummarycomponent/data.json";

const ResultsSummaryComponent = () => {
  return (
    <div className={styles.container}>
      <main className={styles.results}>
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
          <div className={styles.skills}>
            {data.map((d) => (
              <article className={styles.skill} key={d.icon}>
                <div className={styles.imgAndSkill}>
                  <img src={d.icon} alt="" />
                  <p>{d.category}</p>
                </div>
                <div className={styles.score}>
                  <p>{d.score}</p>
                  <p>/100</p>
                </div>
              </article>
            ))}
          </div>
          <button className={styles.continueButton}>Continue</button>
        </section>
      </main>
    </div>
  );
};

export default ResultsSummaryComponent;
