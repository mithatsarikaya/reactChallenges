"use client";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import styles from "./rickandmorty.module.css";
import DropdownIcon from "./components/DropdownIcon";
import useGetData from "./hooks/useGetData";

const RickAndMortyChallenge = () => {
  const [searchedText, setSearchedText] = useState("");

  const [isDropped, setIsDropped] = useState(false);
  const { isLoading, characters, setCharacters, isError } =
    useGetData(searchedText);

  let filteredCharacters =
    characters?.filter((character) =>
      character.name.toLowerCase().includes(searchedText)
    ) || [];

  //if user starts to search when droppeddown is off then open the dropdown menu
  useEffect(() => {
    searchedText != "" ? setIsDropped(true) : setIsDropped(false);
  }, [searchedText]);

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
      <form className={styles.allSections}>
        <div className={styles.inputSelectedNamesSearchSection}>
          <div className={styles.selectedNamesAndInput}>
            {characters &&
              characters.map(
                (character) =>
                  character.isSelected && (
                    <div
                      key={character.id}
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
          </div>
          <div className={styles.dropdown}>
            <DropdownIcon isDropped={isDropped} setIsDropped={setIsDropped} />
          </div>
        </div>
        {isDropped && (
          <div className={styles.charactersSection}>
            <ul className={styles.allCharacterRows}>
              {filteredCharacters?.length > 0 ? (
                filteredCharacters.map((character) => (
                  <div className={styles.rowContainer} key={character.imageUrl}>
                    <input
                      className={styles.inputArea}
                      type="checkbox"
                      name=""
                      id=""
                      // defaultChecked={character.isSelected}
                      checked={character.isSelected}
                      onChange={(e) => handleCheckbox(e, character.id)}
                    />
                    <img
                      className={styles.characterImage}
                      src={character.imageUrl}
                      alt=""
                    />
                    <div>
                      <div>
                        {getHighlightedText(character.name, searchedText)}
                      </div>
                      <span>{character.episodeCount} episodes</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.noResult}>
                  {" "}
                  {isError ? isError : " No results found"}
                </p>
              )}
            </ul>
          </div>
        )}
      </form>
    </main>
  );
};

export default RickAndMortyChallenge;
