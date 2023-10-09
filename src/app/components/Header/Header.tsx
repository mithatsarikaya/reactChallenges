import Link from "next/link";
import styles from "./header.module.css";

const Header = () => {
  return (
    <nav className={styles.navbar}>
      <Link href={"/"}>
        <h1 className={styles.mainHeader}>React challenges by nuuklu</h1>
      </Link>
    </nav>
  );
};

export default Header;
