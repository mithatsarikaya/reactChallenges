import styles from "./rickandmorty.module.css";

const RickAndMortyChallenge = async () => {
  let data = await fetch("https://rickandmortyapi.com/api/character").then(
    (res) =>
      res.json().then((resJson) => {
        return resJson;
      })
  );

  //   console.log(resJson);
  console.log(data);

  return (
    <main className={styles.container}>
      <div>
        <select name="" id="" placeholder="write somet">
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
          <option value="">4</option>
        </select>
      </div>
    </main>
  );
};

export default RickAndMortyChallenge;
