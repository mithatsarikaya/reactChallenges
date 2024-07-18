import config from "../config.json";
import { ApiData, ApiDataLocation, Result } from "../types";

export async function getAllCharactersByFilters(status: string | null) {
  // when page initial loads it has no query string
  let queryString =
    status == undefined
      ? `https://rickandmortyapi.com/api/character/`
      : `https://rickandmortyapi.com/api/character/?status=${status?.toLowerCase()}`;
  console.log(queryString);
  let res = await fetch(queryString);
  let allCharacters: ApiData = await res.json();
  return allCharacters;
}

export async function getAllLocationsByText(locationText: string | null) {
  // when page initial loads it has no query string
  let queryString =
    locationText == undefined
      ? `https://rickandmortyapi.com/api/location`
      : `https://rickandmortyapi.com/api/location?name=${locationText?.toLowerCase()}`;
  console.log(queryString);
  let res = await fetch(queryString);
  let allLocations: ApiDataLocation = await res.json();
  return allLocations;
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
