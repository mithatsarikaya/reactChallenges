import Link from "next/link";
import styles from "./header.module.css";

const Header = () => {
  return (
    <nav className={styles.navbar}>
      <Link href={"/"}>
        <h1>React challenges</h1>
      </Link>
    </nav>
  );
};

export default Header;
