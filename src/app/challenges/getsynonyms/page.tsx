"use client";
import { useEffect, useState } from "react";
import styles from "./getsynonyms.module.css";

type TResponse = { word: string; score: number }[];

const GetSynonyms = () => {
  let url = "https://api.datamuse.com/words?rel_syn=";

  const [word, setWord] = useState<string>("");
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  //i create this state to prevent fetching whenever word changess
  //i want it fetch when user submit the form or clicks another word
  const [getSynonyms, setGetSynonyms] = useState<boolean>(false);

  const fetchWithWord = (word: string) => {
    fetch(url + word)
      .then((res) => res.json())
      .then((resJson: TResponse) => {
        setError(false);
        setSynonyms([]);
        if (resJson.length >= 4) {
          setSynonyms(resJson.slice(0, 4).map((word) => word.word));
        } else if (resJson.length > 0) {
          setSynonyms(resJson.map((w) => w.word));
        } else if (resJson.length == 0) {
          setError(true);
        }
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGetSynonyms(true);
    fetchWithWord(word);
  };

  const lookToSynonymsofSynonym = (
    e: React.MouseEvent<HTMLButtonElement>,
    wordFromSynonyms: string
  ) => {
    e.preventDefault();
    setWord(wordFromSynonyms);
    setGetSynonyms(true);
  };

  useEffect(() => {
    getSynonyms && fetchWithWord(word);
  }, [word]);

  return (
    <main className={styles.getsynonymsContainer}>
      <h1 style={{ fontSize: "3rem", textAlign: "center" }}>Not Finished</h1>
      <form onSubmit={handleSubmit} className={styles.synonymsForm} action="">
        <input
          value={word}
          onChange={(e) => {
            setGetSynonyms(false);
            setWord(e.target.value);
          }}
          type="text"
          placeholder="write a word"
        />
        <button>Check for synonyms</button>
        {error && <div style={{ color: "red" }}>No synonyms found</div>}
      </form>
      <div className={styles.buttons}>
        {synonyms &&
          synonyms.map((word) => (
            <button
              onClick={(e) => lookToSynonymsofSynonym(e, word)}
              key={word}
            >
              {word}
            </button>
          ))}
      </div>
    </main>
  );
};

export default GetSynonyms;
