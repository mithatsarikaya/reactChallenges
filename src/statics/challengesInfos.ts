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
];

export default challengesInfos;
