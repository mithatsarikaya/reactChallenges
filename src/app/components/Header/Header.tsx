import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Link href={"/"}>
        <h1>React challenges</h1>
      </Link>
    </header>
  );
};

export default Header;
