"use client";
import { useEffect, useState } from "react";
import styles from "./rickandmorty.module.css";
import { ApiData } from "./types";

const RickAndMortyChallenge = () => {
  let getData = async (): Promise<ApiData> => {
    let data = await fetch("https://rickandmortyapi.com/api/character").then(
      (res) =>
        res.json().then((resJson) => {
          return resJson;
        })
    );
    return data;
  };

  let getNamesImagesAndEpisodeNumbersWithIsSelected = async () => {
    return (await getData()).results.map((result) => ({
      id: result.id,
      name: result.name,
      imageUrl: result.image,
      episodeCount: result.episode.length,
      isSelected: false,
    }));
  };

  const [characters, setCharacters] = useState<Awaited<
    ReturnType<typeof getNamesImagesAndEpisodeNumbersWithIsSelected>
  > | null>(null);

  useEffect(() => {
    getNamesImagesAndEpisodeNumbersWithIsSelected().then((res) =>
      setCharacters(res)
    );
  }, []);

  //TODO: working on checkbox
  return (
    <main className={styles.container}>
      <article>
        <div>
          <div>
            {characters?.map(
              (character) => character.isSelected && <p>{character.name}</p>
            )}
            <input
              className={styles.inputArea}
              type="search"
              name=""
              id=""
              placeholder="write smt"
            />
          </div>
          <div>
            <ul>
              {characters &&
                characters.map((character) => (
                  <div className={styles.rowContainer} key={character.imageUrl}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      defaultChecked={character.isSelected}
                    />
                    <img
                      className={styles.characterImage}
                      src={character.imageUrl}
                      alt=""
                    />
                    <div>
                      <li className={styles.rowsInDropDown}>
                        {character.name}
                      </li>
                      <span>{character.episodeCount} episodes</span>
                    </div>
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </article>
    </main>
  );
};

export default RickAndMortyChallenge;
