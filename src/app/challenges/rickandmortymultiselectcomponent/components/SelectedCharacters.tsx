import { Dispatch, MouseEvent, SetStateAction } from "react";
import styles from "../rickandmorty.module.css";

type TPropsSelectedCharacters = {
  characters:
    | {
        id: number;
        name: string;
        imageUrl: string;
        episodeCount: number;
        isSelected: boolean;
      }[]
    | null
    | undefined;

  setCharacters: Dispatch<
    SetStateAction<
      | {
          id: number;
          name: string;
          imageUrl: string;
          episodeCount: number;
          isSelected: boolean;
        }[]
      | null
      | undefined
    >
  >;
};

const SelectedCharacters = ({
  characters,
  setCharacters,
}: TPropsSelectedCharacters) => {
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

  return (
    characters &&
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
    )
  );
};

export default SelectedCharacters;
