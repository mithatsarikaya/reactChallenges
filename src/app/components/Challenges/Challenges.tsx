"use client";
import styles from "./challenges.module.css";
import challengesInfos from "@/statics/challengesInfos";
import SingleChallenge from "./components/SingleChallenge";
import { useState } from "react";
const Challlenges = () => {
  let allChallenges = challengesInfos;

  return (
    <div className={styles.container}>
      {allChallenges.map((challenge) => (
        <SingleChallenge key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
};

export default Challlenges;
