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
    return <div>searchparams undefined</div>;
  }

  // TODO: check for anys
  let allCharacters = await getAllCharactersByFilters(
    searchParams.status as any,
    searchParams.selectedLocationIDs as any
  );

  // TODO: check for anys
  let allLocations = await getAllLocationsByText(searchParams.lastSeen as any);
  return (
    <div className={styles.mainPage}>
      {allCharacters ? (
        <div className={styles.filterlocationsallcharacters}>
          <FilterCharacters allLocations={allLocations.results} />
          <main className={styles.allCharactersSection}>
            {allCharacters.map((character) => (
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
