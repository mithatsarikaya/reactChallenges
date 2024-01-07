"use client";
import { MouseEvent, useEffect } from "react";
import styles from "./components.module.css";

// TODOne: working on dropdown and up icon

const DropdownIcon = ({
  isDropped,
  setIsDropped,
  searchedText,
}: {
  isDropped: boolean;
  setIsDropped: React.Dispatch<React.SetStateAction<boolean>>;
  searchedText: string;
}) => {
  const handleDropdownMenu = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setIsDropped(!isDropped);
  };
  //if user starts to search when droppeddown is off then open the dropdown menu
  useEffect(() => {
    searchedText != "" ? setIsDropped(true) : setIsDropped(false);
  }, [searchedText]);

  return (
    <button
      onClick={(e) => handleDropdownMenu(e)}
      className={styles.dropdownIcon}
    >
      {isDropped ? "▲" : "▼"}
    </button>
  );
};

export default DropdownIcon;
