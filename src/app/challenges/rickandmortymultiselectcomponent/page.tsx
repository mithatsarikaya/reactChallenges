"use client";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import styles from "./rickandmorty.module.css";
import { ApiData } from "./types";
import DropdownIcon from "./components/DropdownIcon";

const RickAndMortyChallenge = () => {
  const [characters, setCharacters] = useState<Awaited<
    ReturnType<typeof getNamesImagesAndEpisodeNumbersWithIsSelected>
  > | null>(null);

  const [searchedText, setSearchedText] = useState("");

  let filteredCharacters = characters?.filter((character) =>
    character.name.toLowerCase().includes(searchedText)
  );

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

  function getHighlightedText(text: string, highlight: string) {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { fontWeight: "bold" }
                : {}
            }
          >
            {part}
          </span>
        ))}
      </span>
    );
  }

  //TODOne: working on checkbox
  //TODOne: work on input text to filter checkboxes
  return (
    <main className={styles.container}>
      <article className={styles.allSections}>
        <div className={styles.selectedNamesAndInput}>
          {characters &&
            characters.map(
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
            placeholder="search"
            value={searchedText}
            onChange={(e) => setSearchedText(e.target.value)}
          />
          <DropdownIcon isDropped={false} />
        </div>
        <div className={styles.charactersSection}>
          <ul className={styles.allCharacterRows}>
            {filteredCharacters &&
              filteredCharacters.map((character) => (
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
                    {/* <li className={styles.namesInDropDown}>{character.name}</li> */}
                    <div>
                      {getHighlightedText(character.name, searchedText)}
                    </div>
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
