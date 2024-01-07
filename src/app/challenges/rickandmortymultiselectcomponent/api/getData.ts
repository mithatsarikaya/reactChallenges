import config from "../config.json";
import { ApiData, Result } from "../types";

export async function getAllCharacters() {
  let allData: Result[] = [];
  let currentPage = 1;

  while (true) {
    const response = await fetch(
      `${config.apiUrlForAllCharacters}${currentPage}`
    );
    const data = await response.json();

    allData = allData.concat(data.results); // Combine current results with previous ones

    if (data.info.next === null) {
      break; // Stop when there are no more pages
    }

    currentPage++;
  }

  return allData;
}

export async function getCharactersByQuery(query: string): Promise<Result[]> {
  try {
    let url = `${config.apiUrlForCharactersByQuery}${query}`;

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson.results;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
