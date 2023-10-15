import Link from "next/link";
import styles from "./challengecomponents.module.css";
import { TChallangeInfo } from "@/statics/challengesInfos";

const SingleChallenge = ({ challenge }: { challenge: TChallangeInfo }) => {
  return (
    <article className={styles.challenge} key={challenge.id}>
      <Link className={styles.challengeLink} href={challenge.linkHref()}>
        {challenge.urlName} {challenge.onProgress && "(not finished)"}
      </Link>
      <p>{challenge.challenge}</p>
    </article>
  );
};

export default SingleChallenge;
