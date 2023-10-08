import challengesInfos from "@/statics/challengesInfos";
import Link from "next/link";
const Challlenges = () => {
  return (
    <div>
      {challengesInfos.map((challenge) => (
        <article key={challenge.id}>
          <Link href={challenge.linkHref()}>{challenge.urlName}</Link>
        </article>
      ))}
    </div>
  );
};

export default Challlenges;
