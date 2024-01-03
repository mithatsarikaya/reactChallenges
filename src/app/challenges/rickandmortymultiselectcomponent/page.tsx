"use client";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
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

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    setCharacters((prevCharacters) => {
      if (!prevCharacters) {
        return null;
      } else {
        return prevCharacters?.map((character) =>
          id == character.id
            ? { ...character, isSelected: !character.isSelected }
            : character
        );
      }
    });
  };

  const handleSelectedNameClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    id: number
  ) => {
    setCharacters((prevCharacters) => {
      if (!prevCharacters) {
        return null;
      } else {
        return prevCharacters?.map((character) =>
          id == character.id ? { ...character, isSelected: false } : character
        );
      }
    });
  };

  //TODOne: working on checkbox
  //TODO: work on input text to filter checkboxes
  return (
    <main className={styles.container}>
      <article className={styles.allSections}>
        <div className={styles.selectedNamesAndInput}>
          {characters &&
            characters?.map(
              (character) =>
                character.isSelected && (
                  <div
                    onClick={(e) => handleSelectedNameClick(e, character.id)}
                  >
                    <button className={styles.nameButton}>
                      {character.name} &times;
                    </button>
                  </div>
                )
            )}
          <input
            className={styles.inputArea}
            type="search"
            name=""
            id=""
            placeholder="write smt"
          />
        </div>
        <div className={styles.characterSection}>
          <ul>
            {characters &&
              characters.map((character) => (
                <div className={styles.rowContainer} key={character.imageUrl}>
                  <input
                    className={styles.inputArea}
                    type="checkbox"
                    name=""
                    id=""
                    defaultChecked={character.isSelected}
                    checked={character.isSelected}
                    onChange={(e) => handleCheckbox(e, character.id)}
                  />
                  <img
                    className={styles.characterImage}
                    src={character.imageUrl}
                    alt=""
                  />
                  <div>
                    <li className={styles.rowsInDropDown}>{character.name}</li>
                    <span>{character.episodeCount} episodes</span>
                  </div>
                </div>
              ))}
          </ul>
        </div>
      </article>
    </main>
  );
};

export default RickAndMortyChallenge;
