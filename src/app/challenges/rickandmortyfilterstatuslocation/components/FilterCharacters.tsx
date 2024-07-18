"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LocationData } from "../types";
import styles from "../rickandmorty.module.css";

type TSelectedLocations = { name: string; id: string }[];

const FilterCharacters = ({
  allLocations,
}: {
  allLocations: LocationData[];
}) => {
  const router = useRouter();
  const [userFilterRadioButtons, setUserFilterRadioButtons] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedLocations, setSelectedLocations] =
    useState<TSelectedLocations>([]);

  function clearAllFilters(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setUserFilterRadioButtons("");
    setSearchText("");
    setSelectedLocations([]);
  }

  function handleRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserFilterRadioButtons(e.target.value);
  }

  function handleSearchTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value.toLowerCase());
  }
  function handleSelectAndUnSelectLocation(name: string, id: string) {
    if (selectedLocations.map((location) => location.id).includes(id)) {
      setSelectedLocations((prevState) =>
        prevState.filter((loc) => loc.id != id)
      );
    } else {
      setSelectedLocations((prevState) => [...prevState, { name, id }]);
    }
  }

  console.log(selectedLocations.map((loca) => loca.id).join(","));

  useEffect(() => {
    router.push(
      `?status=${userFilterRadioButtons}&lastSeen=${searchText}&selectedLocationIDs=${selectedLocations
        .map((loca) => loca.id)
        .join(",")}`
    );
  }, [userFilterRadioButtons, searchText, selectedLocations]);

  console.log(userFilterRadioButtons);
  console.log(searchText);
  return (
    <section>
      <input
        className={styles.searchtext}
        type="text"
        onChange={(e) => handleSearchTextChange(e)}
        placeholder="search places..."
      />
      <button onClick={(e) => clearAllFilters(e)}>Clear All Filters</button>

      {allLocations ? (
        <article className={styles.allLocations}>
          {allLocations.map((location) => (
            <div
              onClick={(e) =>
                handleSelectAndUnSelectLocation(
                  location.name,
                  location.id.toString()
                )
              }
              className={styles.location}
              key={location.id}
            >
              <p>{location.name}</p>
              <p>{location.dimension}</p>
            </div>
          ))}
        </article>
      ) : (
        <div>Location data could not fetch</div>
      )}
      <label htmlFor="Alive">Alive</label>
      <input
        onChange={(e) => handleRadioChange(e)}
        type="radio"
        name="status"
        id="Alive"
        value="Alive"
      />
      <label htmlFor="Death">Death</label>
      <input
        onChange={(e) => handleRadioChange(e)}
        type="radio"
        name="status"
        id="Death"
        value="dead"
      />
      <label htmlFor="Unknown">Unknown</label>
      <input
        onChange={(e) => handleRadioChange(e)}
        type="radio"
        name="status"
        id="Unknown"
        value="unknown"
      />

      {selectedLocations.length > 0 &&
        selectedLocations.map((selectedLocation) => (
          <p key={selectedLocation.id}>{selectedLocation.name}</p>
        ))}
    </section>
  );
};

export default FilterCharacters;
