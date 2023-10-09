"use client";
import { useState } from "react";
import styles from "./getsynonyms.module.css";

const GetSynonyms = () => {
  let url = "https://api.datamuse.com/words?rel_syn=";

  const [word, setWord] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(url + word)
      .then((res) => res.json())
      .then((resJson) => console.log(resJson));
  };

  return (
    <main className={styles.getsynonymsContainer}>
      <h1 style={{ fontSize: "3rem" }}>Not Finished</h1>
      <form onSubmit={handleSubmit} className={styles.synonymsForm} action="">
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          type="text"
          placeholder="write a word"
        />
        <button>Check for synonyms</button>
      </form>
      <div className={styles.buttons}>
        <button>asdasdasdasdX</button>
        <button>asdasdasdasdX</button>
        <button>asdasdasdasdX</button>
        <button>asdasdasdasdX</button>
        <button>asdasdasdasdX</button>
        <button>Y</button>
      </div>
    </main>
  );
};

export default GetSynonyms;
