"use client";
import { MouseEvent, useState } from "react";
import styles from "./components.module.css";

// TODOne: working on dropdown and up icon

const DropdownIcon = ({
  isDropped,
  setIsDropped,
}: {
  isDropped: boolean;
  setIsDropped: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleDropdownMenu = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setIsDropped(!isDropped);
  };

  return (
    <button
      onClick={(e) => handleDropdownMenu(e)}
      className={styles.dropdownIcon}
    >
      {isDropped ? "▲" : "▼"}
    </button>
  );
};
// const DropdownIcon = ({ isDropped }: { isDropped: boolean }) => {
//   return isDropped ? (
//     <i className={`${styles.arrow} ${styles.up}`}></i>
//   ) : (
//     <i className={`${styles.arrow} ${styles.down}`}></i>
//   );
// };

export default DropdownIcon;
