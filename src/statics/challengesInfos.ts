export type TChallangeInfo = {
  id: number;
  urlName: string;
  linkHref: Function;
  challenge: string;
  inspiredBy: string;
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
];

export default challengesInfos;
