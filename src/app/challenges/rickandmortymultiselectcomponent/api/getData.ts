import config from "../config.json";
import { ApiData } from "../types";

const getData = async (): Promise<ApiData> => {
  let data = await fetch(config.apiUrl).then((res) =>
    res.json().then((resJson) => {
      return resJson;
    })
  );
  return data;
};

export default getData;
