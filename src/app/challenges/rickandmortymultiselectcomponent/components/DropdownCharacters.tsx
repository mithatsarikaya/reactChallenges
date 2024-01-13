import HighlightedText from "./HighlightedText";
import styles from "../rickandmorty.module.css";
import { Dispatch, SetStateAction } from "react";

type TPropsDropdownMenu = {
  filteredCharacters: {
    id: number;
    name: string;
    imageUrl: string;
    episodeCount: number;
    isSelected: boolean;
  }[];
  searchedText: string;
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

const DropdownCharacters = ({
  filteredCharacters,
  searchedText,
  setCharacters,
}: TPropsDropdownMenu) => {
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

  return filteredCharacters.map((character) => (
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
        onChange={(e) => handleCheckbox(character.id)}
      />
      <img className={styles.characterImage} src={character.imageUrl} alt="" />
      <div>
        <div>
          <HighlightedText name={character.name} searchedText={searchedText} />
        </div>
        <span>{character.episodeCount} episodes</span>
      </div>
    </div>
  ));
};

export default DropdownCharacters;
