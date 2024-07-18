import {
  getAllCharactersByFilters,
  getAllLocationsByText,
} from "./api/getData";
import FilterCharacters from "./components/FilterCharacters";
import styles from "./rickandmorty.module.css";

const FilterRickAndMorty = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  if (typeof searchParams == "undefined") {
    return <div>Problem occured</div>;
  }

  console.log("chekc", searchParams);
  let allCharacters = await getAllCharactersByFilters(searchParams.status);
  console.log(allCharacters);

  let allLocations = await getAllLocationsByText(searchParams.lastSeen);
  return (
    <div className={styles.mainPage}>
      {allCharacters.results ? (
        <div className={styles.filterlocationsallcharacters}>
          <FilterCharacters allLocations={allLocations.results} />
          <main className={styles.allCharactersSection}>
            {allCharacters.results.map((character) => (
              <article key={character.id}>
                <p>{character.name}</p>
                <p>{character.status}</p>
                <p>{character.location.name}</p>
                <img src={character.image} alt="" />
              </article>
            ))}
          </main>
        </div>
      ) : (
        <div>DATA COULD NOT FETCH</div>
      )}
    </div>
  );
};

export default FilterRickAndMorty;
