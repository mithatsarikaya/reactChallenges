import styles from "./challenges.module.css";
import challengesInfos from "@/statics/challengesInfos";
import Link from "next/link";
const Challlenges = () => {
  return (
    <div>
      {challengesInfos.map((challenge) => (
        <article className={styles.challenge} key={challenge.id}>
          <Link className={styles.challengeLink} href={challenge.linkHref()}>
            {challenge.urlName}
          </Link>
          <p>{challenge.challenge}</p>
        </article>
      ))}
    </div>
  );
};

export default Challlenges;
