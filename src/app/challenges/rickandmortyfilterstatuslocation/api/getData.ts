import config from "../config.json";
import { ApiData, ApiDataLocation, ApiLocationData, Result } from "../types";

export async function getAllCharactersByFilters(
  status: string | null,
  locationIDs: string | null
) {
  if (typeof status == undefined || typeof locationIDs == undefined) {
    return;
  }

  if (!status && !locationIDs) {
    return await getCharacters();
  }

  console.log(status, locationIDs);

  if (status && !locationIDs) {
    return await getCharactersByStatus(status);
  }
  if (!status && locationIDs) {
    console.log("status yok, location var");
    let characters = await getCharactersByLocationIDList(locationIDs);
    console.log({ characters });
    return characters;
  }
  if (status && locationIDs) {
    console.log("status var, location var");
    let characters = await getCharactersByLocationIDListAndStatus(
      locationIDs,
      status
    );
    return characters;
  }
}

export async function getCharacters() {
  let res = await fetch(`https://rickandmortyapi.com/api/character/`);
  let allCharacters: ApiData = await res.json();
  return allCharacters.results;
}
export async function getCharactersByStatus(status: string) {
  let queryString = `https://rickandmortyapi.com/api/character/?status=${status?.toLowerCase()}`;
  let res = await fetch(queryString);
  let allCharacters: ApiData = await res.json();
  return allCharacters.results;
}

export async function getAllLocationsByText(locationText: string | null) {
  // when page initial loads it has no query string
  let queryString =
    locationText == undefined
      ? `https://rickandmortyapi.com/api/location`
      : `https://rickandmortyapi.com/api/location?name=${locationText?.toLowerCase()}`;
  let res = await fetch(queryString);
  let allLocations: ApiDataLocation = await res.json();
  return allLocations;
}

export async function getCharactersByLocationIDList(idList: string) {
  let locations = await getLocationByIDList(idList);

  let characters: Result[] = [];
  locations.map((loc) =>
    loc.residents.map(async (link) => {
      let character = await getSingleCharacter(link);
      characters.push(character);
    })
  );

  if (!characters) return await getCharacters();

  return characters;
}
export async function getCharactersByLocationIDListAndStatus(
  idList: string,
  status: string
) {
  let locations = await getLocationByIDList(idList);

  let characters: Result[] = [];
  locations.map((loc) =>
    loc.residents.map(async (link) => {
      let character = await getSingleCharacter(link);
      if (character.status.toLowerCase() == status.toLowerCase()) {
        characters.push(character);
      }
    })
  );

  if (!characters) return await getCharacters();

  return characters;
}

export async function getLocationByIDList(idList: string) {
  // let queryString = `https://rickandmortyapi.com/api/location/18`;
  let queryString = `https://rickandmortyapi.com/api/location/${idList}`;
  // console.log({ queryString });
  let res = await fetch(queryString);

  let allLocations: ApiLocationData = await res.json();
  // console.log([allLocations]);
  if (Array.isArray(allLocations)) {
    return allLocations;
  } else {
    return [allLocations];
  }
}

export async function getSingleCharacter(link: string) {
  let characterRes = await fetch(link);
  let character: Result = await characterRes.json();
  return character;
}

export async function getCharactersByQuery(
  query: string
): Promise<Result[] | string> {
  try {
    let url = `${config.apiUrlForCharactersByQuery}${query}`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.results) {
      return responseJson.results;
    } else {
      return "No character found";
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
