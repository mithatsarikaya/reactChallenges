export type TChallangeInfo = {
  id: number;
  urlName: string;
  linkHref: Function;
  challenge: string;
  inspiredBy?: string;
  onProgress?: boolean;
};

export type TChallangeInfoArray = TChallangeInfo[];

let mainUrlForChallenges = "challenges/";

const challengesInfos: TChallangeInfoArray = [
  {
    id: 0,
    urlName: "drawcircle",
    linkHref() {
      return mainUrlForChallenges.concat(this.urlName);
    },
    challenge: "Add circle to the point clicked by user",
    inspiredBy:
      "https://www.youtube.com/watch?v=A0BmLYHLPZs&list=PL6x5Q-Sj_Bla3_wMqhETxMBjFml0XJNPI&index=4",
  },
  {
    id: 1,
    urlName: "pickcolor",
    linkHref() {
      return mainUrlForChallenges.concat(this.urlName);
    },
    challenge: "Pick right color that show on the screen",
    inspiredBy:
      "https://www.youtube.com/watch?v=QNYljS0_TOE&list=PL6x5Q-Sj_Bla3_wMqhETxMBjFml0XJNPI&index=1&t=2s",
  },
  {
    id: 2,
    urlName: "getsynonyms",
    challenge: "Get synonyms of the input from an API",
    inspiredBy: "https://www.youtube.com/watch?v=-Rtlnsgbc0k&t=645s",
    linkHref() {
      return mainUrlForChallenges.concat(this.urlName);
    },
    onProgress: false,
  },
  {
    id: 3,
    urlName: "getinqueue",
    challenge: "Put given number to the least sized queue",
    inspiredBy: "https://www.youtube.com/watch?v=B9fmr1TpKHE",
    linkHref() {
      return mainUrlForChallenges.concat(this.urlName);
    },
    onProgress: false,
  },
  {
    id: 4,
    urlName: "tictactoe",
    challenge: "classic tictactoe game",
    linkHref() {
      return mainUrlForChallenges.concat(this.urlName);
    },
    onProgress: false,
  },
];

export default challengesInfos;
