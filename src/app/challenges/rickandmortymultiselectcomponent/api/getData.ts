import config from "../config.json";
import { ApiData } from "../types";

const getApiData = async (): Promise<ApiData> => {
  // TODO: get all characters from api
  try {
    let res = await fetch(config.apiUrl);
    let resJson = await res.json();
    return resJson;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export default getApiData;
