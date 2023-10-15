import styles from "./challenges.module.css";
import challengesInfos from "@/statics/challengesInfos";
import SingleChallenge from "./components/SingleChallenge";
const Challlenges = () => {
  return (
    <div>
      {challengesInfos.fromYouTube.map((challenge) => (
        <SingleChallenge key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
};

export default Challlenges;
