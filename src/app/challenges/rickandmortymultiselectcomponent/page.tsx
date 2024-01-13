"use client";
import { useEffect, useState } from "react";
import styles from "./rickandmorty.module.css";
import DropdownIcon from "./components/DropdownIcon";
import useGetData from "./hooks/useGetData";
import DropdownCharacters from "./components/DropdownCharacters";
import SelectedCharacters from "./components/SelectedCharacters";

const RickAndMortyChallenge = () => {
  const [searchedText, setSearchedText] = useState("");

  const [isDropped, setIsDropped] = useState(false);
  const { isLoading, characters, setCharacters, isError } =
    useGetData(searchedText);

  //mouse keys

  useEffect(() => {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      e.key == "ArrowDown" && !isDropped && setIsDropped(true);
      e.key == "ArrowUp" && isDropped && setIsDropped(false);
    });
  }, [isDropped]);

  //mouse keys

  let filteredCharacters =
    characters?.filter((character) =>
      character.name.toLowerCase().includes(searchedText)
    ) || [];

  //TODOne: working on checkbox
  //TODOne: work on input text to filter checkboxes
  return (
    <main className={styles.container}>
      <article id="article123" className={styles.allSections}>
        <div className={styles.inputSelectedNamesSearchSection}>
          <div className={styles.selectedNamesAndInput}>
            {
              characters && (
                <SelectedCharacters
                  characters={characters}
                  setCharacters={setCharacters}
                />
              )

              // characters.map(
              //   (character) =>
              //     character.isSelected && (
              //       <div
              //         key={character.id}
              //         onClick={(e) => handleSelectedNameClick(e, character.id)}
              //       >
              //         <button className={styles.nameButton}>
              //           {character.name} &times;
              //         </button>
              //       </div>
              //     )
              // )
            }
            <input
              autoFocus
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
            <DropdownIcon
              isDropped={isDropped}
              setIsDropped={setIsDropped}
              searchedText={searchedText}
            />
          </div>
        </div>
        {isDropped && (
          <div className={styles.charactersSection}>
            <ul className={styles.allCharacterRows}>
              {!isLoading && filteredCharacters?.length > 0 ? (
                <DropdownCharacters
                  setCharacters={setCharacters}
                  filteredCharacters={filteredCharacters}
                  searchedText={searchedText}
                />
              ) : (
                <p className={styles.noResult}>
                  {" "}
                  {isError && !isLoading ? isError : "loading..."}
                </p>
              )}
            </ul>
          </div>
        )}
      </article>
    </main>
  );
};

export default RickAndMortyChallenge;
