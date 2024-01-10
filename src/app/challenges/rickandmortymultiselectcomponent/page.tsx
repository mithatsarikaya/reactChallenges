"use client";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./rickandmorty.module.css";
import DropdownIcon from "./components/DropdownIcon";
import useGetData from "./hooks/useGetData";
import HighlightedText from "./components/HighlightedText";

const RickAndMortyChallenge = () => {
  const [searchedText, setSearchedText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDropped, setIsDropped] = useState(false);
  const { isLoading, characters, setCharacters, isError } =
    useGetData(searchedText);

  //mouse keys

  useEffect(() => {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      inputRef.current?.dispatchEvent(
        new KeyboardEvent("keypress", {
          key: "Tab",
        })
      );

      return () => {
        console.log("object");

        window.addEventListener("keydown", (e: KeyboardEvent) => {
          console.log(inputRef.current?.nextSibling);
        });
      };
      // console.log(inputRef.current?.nextSibling);
      // const nextElement = inputRef.current?.nextElementSibling;
      // console.log({ nextElement });

      // if (nextElement) {
      //   // nextElement.focus();
      // }

      // e.key == "ArrowDown" && !isDropped && setIsDropped(true);
      // console.log("hey");
      // console.log("active element", document.activeElement?.nextSibling);
      // // e.preventDefault();
      // const nextElement = document.activeElement!
      //   .nextElementSibling as HTMLElement;
      // if (nextElement) {
      //   nextElement.focus();
      // }
      // window.dispatchEvent(new KeyboardEvent("keypress", { key: "Tab" }));
    });

    // window.addEventListener("keydown", (e: KeyboardEvent) => console.log(e));
  }, []);

  //mouse keys

  let filteredCharacters =
    characters?.filter((character) =>
      character.name.toLowerCase().includes(searchedText)
    ) || [];

  const handleCheckbox = (id: number) => {
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
  //TODOne: work on input text to filter checkboxes
  return (
    <main className={styles.container}>
      <article id="article123" className={styles.allSections}>
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
              ref={inputRef}
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
              {filteredCharacters?.length > 0 ? (
                filteredCharacters.map((character) => (
                  <div
                    onClick={(e) => handleCheckbox(character.id)}
                    className={styles.rowContainer}
                    key={character.imageUrl}
                  >
                    <input
                      className={styles.inputArea}
                      type="checkbox"
                      name=""
                      id=""
                      // defaultChecked={character.isSelected}
                      checked={character.isSelected}
                      // onChange={(e) => handleCheckbox(character.id)}
                    />
                    <img
                      className={styles.characterImage}
                      src={character.imageUrl}
                      alt=""
                    />
                    <div>
                      <div>
                        <HighlightedText
                          name={character.name}
                          searchedText={searchedText}
                        />
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
      </article>
    </main>
  );
};

export default RickAndMortyChallenge;
