import Image from "next/image";
import styles from "./homebutton.module.css";
import Link from "next/link";

const HomeButton = () => {
  return (
    <Link className={styles.homeButton} href={"/"}>
      <Image width={75} height={75} src="/homeIcon.svg" alt="home icon"></Image>
    </Link>
  );
};

export default HomeButton;
