import Image from "next/image";
import styles from "./homebutton.module.css";
import Link from "next/link";

const HomeButton = () => {
  return (
    <Link className={styles.homeButton} href={"/"}>
      <Image
        style={{ backgroundColor: "white", borderRadius: "50%" }}
        width={80}
        height={80}
        src="/homeIcon.svg"
        alt="home icon"
      ></Image>
    </Link>
  );
};

export default HomeButton;
