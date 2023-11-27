function RemoveHiddenLabels({ value, hiddenLabelList }) {
  const storeHiddenData = [];
  for (const dataDict of value) {
    if (hiddenLabelList.includes(dataDict.tagName)) {
      storeHiddenData.push(dataDict); // store the data in a seperate list
    }
  }
  let dataToShow = value.filter(
    dataDict => !hiddenLabelList.includes(dataDict.tagName)
  ); // Allow only the dict that their tagName is not in the list
  return {dataToShow, storeHiddenData};
}



let value = [
  {
    start: 68,
    end: 73,
    tagName: "TYPE",
    color: "#b53535",
    text: "ferry",
  },
  {
    start: 131,
    end: 140,
    tagName: "TYPE",
    color: "#b53535",
    text: "catamaran",
  },
  {
    start: 246,
    end: 250,
    tagName: "YOB",
    color: "#808080",
    text: "2011",
  },
  {
    start: 251,
    end: 258,
    tagName: "YOB_INDI",
    color: "#808080",
    text: "onwards",
  },
  {
    start: 58,
    end: 770,
    tagName: "SEGMENTS_IN",
    color: "#808080",
    text: "passenger ferry as follows : + type : al . fast passenger ship ( hsc ) - catamaran , not monohull type . + pax . cap . : abt . 450 ~ 600 pax . + speed : abt . 35 ~ 40 kts . + built year : 2011 onwards ~ ( imperative ! ! ) + main engines : mtu engines prefer . + inspection : worldwide , immediate inspection . . pc candis will be treated as such in the range of above requirements . sincerely , james han any maritime co ltd . cid : image 005 . jpg @ 01 d 12 c 60 . f 1 ef 4 f 10 11 f , ( yoido - dong , hanseo riverpark ) yoiseo - ro 43 gil , youngdeoungpo - gu , seoul , 07239 , korea . : + 82 2 6092 - 8147 ~ 9 070 - 7663 - 3251 : + 82 2 6092 - 8150 : + 82 10 5173 - 8823 : < mailto : < > > < > url : < http :",
  },
];
const hiddenLabelList = ["TYPE"];
let {dataToShow , storeHiddenData} = RemoveHiddenLabels({ value, hiddenLabelList });
console.log(storeHiddenData);
