import config from "../config.json";
import { ApiData, Result } from "../types";

const getApiData = async (url: string): Promise<ApiData> => {
  // TODO: get all characters from api
  try {
    let res = await fetch(url);
    let resJson = await res.json();
    return resJson;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

let isNextUrlNull = false;
let allCharacterData: Result[] = [];

let url = config.apiUrl;

// for (let index = 0; index < 3; index++) {
//   getApiData(url).then((res) => {
//     allCharacterData.push(...res.results);
//     url = res.info.next;
//     console.log({ url });
// console.log(index);
// if (!res.info.next) {
//   isNextUrlNull = true;
// } else {
//   url = res.info.next;
// }
// });
// }

// while (!isNextUrlNull) {
//   getApiData(url).then((res) => {
//     allCharacterData.push(...res.results);
//     console.log(res.info.next);
//     if (!res.info.next) {
//       isNextUrlNull = true;
//     } else {
//       url = res.info.next;
//     }
//   });
// }

// getApiData(url).then((res) => {
//   allCharacterData.push(...res.results);
//   console.log(res.info.next);

//   while (res.info.next != null) {
//     getApiData(res.info.next).then((res) =>
//       allCharacterData.push(...res.results)
//     );
//   }
// });

// getApiData().then(res=>res.)

// TODO:chain fetch by nexturl

export default allCharacterData;
