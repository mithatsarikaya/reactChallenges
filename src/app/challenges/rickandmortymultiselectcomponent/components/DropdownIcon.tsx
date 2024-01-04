import styles from "./components.module.css";

// TODO: working on dropdown and up icon

const DropdownIcon = ({ isDropped }: { isDropped: boolean }) => {
  return isDropped ? <button>▲</button> : <button>▼</button>;
};
// const DropdownIcon = ({ isDropped }: { isDropped: boolean }) => {
//   return isDropped ? (
//     <i className={`${styles.arrow} ${styles.up}`}></i>
//   ) : (
//     <i className={`${styles.arrow} ${styles.down}`}></i>
//   );
// };

export default DropdownIcon;
