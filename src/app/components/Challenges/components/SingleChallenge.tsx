import Link from "next/link";
import styles from "./challengecomponents.module.css";
import { TChallangeInfo } from "@/statics/challengesInfos";

const SingleChallenge = ({ challenge }: { challenge: TChallangeInfo }) => {
  return (
    <Link
      // style={{
      //   pointerEvents: challenge.onProgress ? "none" : "auto",
      // }}
      className={styles.challenge}
      href={challenge.linkHref()}
    >
      <article className={styles.challengeArticle} key={challenge.id}>
        {challenge.urlName} {challenge.onProgress && "(not finished)"}
        <p className={styles.challengeDesc}>{challenge.challenge}</p>
      </article>
    </Link>
  );
};

export default SingleChallenge;
