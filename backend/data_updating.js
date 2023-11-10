const labelist = [
  { labelName: "TYPE", color: "#E74638" },
  { labelName: "YOB", color: "#E74638" },
  { labelName: "YOB_INDI", color: "#E74638" },
  { labelName: "SEGMENTS_IN", color: "#E74638" },
  { labelName: "DWT", color: "#E74638" },
  { labelName: "d", color: "#e55f5f" },
];
const trans = [
  {
    name: "19483625.json",
    content:
      "19483508 have a close client , who is willing to buy fast passenger ferry as follows : + type : al . fast passenger ship ( hsc ) - catamaran , not monohull type . + pax . cap . : abt . 450 ~ 600 pax . + speed : abt . 35 ~ 40 kts . + built year : 2011 onwards ~ ( imperative ! ! ) + main engines : mtu engines prefer . + inspection : worldwide , immediate inspection . . pc candis will be treated as such in the range of above requirements . sincerely , james han any maritime co ltd . cid : image 005 . jpg @ 01 d 12 c 60 . f 1 ef 4 f 10 11 f , ( yoido - dong , hanseo riverpark ) yoiseo - ro 43 gil , youngdeoungpo - gu , seoul , 07239 , korea . : + 82 2 6092 - 8147 ~ 9 070 - 7663 - 3251 : + 82 2 6092 - 8150 : + 82 10 5173 - 8823 : < mailto : < > > < > url : < http : ",
    entities: [
      {
        start: 68,
        end: 73,
        color: "#C24444",
        tagName: "TYPE",
        text: "ferry",
      },
      {
        start: 131,
        end: 140,
        color: "#C24444",
        tagName: "TYPE",
        text: "catamaran",
      },
      {
        start: 246,
        end: 250,
        color: "#C24444",
        tagName: "YOB",
        text: "2011",
      },
      {
        start: 251,
        end: 258,
        color: "#C24444",
        tagName: "YOB_INDI",
        text: "onwards",
      },
      {
        start: 58,
        end: 770,
        color: "#C24444",
        tagName: "SEGMENTS_IN",
        text: "passenger ferry as follows : + type : al . fast passenger ship ( hsc ) - catamaran , not monohull type . + pax . cap . : abt . 450 ~ 600 pax . + speed : abt . 35 ~ 40 kts . + built year : 2011 onwards ~ ( imperative ! ! ) + main engines : mtu engines prefer . + inspection : worldwide , immediate inspection . . pc candis will be treated as such in the range of above requirements . sincerely , james han any maritime co ltd . cid : image 005 . jpg @ 01 d 12 c 60 . f 1 ef 4 f 10 11 f , ( yoido - dong , hanseo riverpark ) yoiseo - ro 43 gil , youngdeoungpo - gu , seoul , 07239 , korea . : + 82 2 6092 - 8147 ~ 9 070 - 7663 - 3251 : + 82 2 6092 - 8150 : + 82 10 5173 - 8823 : < mailto : < > > < > url : < http :",
      },
    ],
  },
  {
    name: "19484255.json",
    content:
      "19484255 dear sirs , our principals are looking for vintage * lpg * tanker for lpg temporary storage with flwg terms : - need cargo tank capacity : * over 88.000 cbm * ( can consider min 70.000 cbm ) - age : * 1990 - 1999 * can accept bit older bit younger - delivery & inspection : * ww * - budget : * usd 20 million - negotiable * - commission : * 2.0 % - 1.5 % * subject to snp sum agreed looking forward to receive your candis . please inform vsls detail , price idea , and time of delivery . ",
    entities: [],
  },
  {
    name: "19483699.json",
    content:
      "12345678 ref : 00127496 2021 05 31 08.58 fm burkmar shipping - genoa s+p nb dept . : + 39010 - 9914479 . : + 39393 9562074 : < > u r g e n t p e - gen cgo vsl - 10 12.000 dwt - 6 7 m draft - need hv 25 ts cranes - age irrelevant - dely med pls propose together with price ideas . thank you and ",
    entities: [
      {
        start: 161,
        end: 174,
        color: "#C24444",
        tagName: "DWT",
        text: "10 12.000 dwt",
      },
      {
        start: 147,
        end: 150,
        color: "#C24444",
        tagName: "SEGMENTS_IN",
        text: "gen",
      },
      {
        start: 161,
        end: 293,
        color: "#C24444",
        tagName: "SEGMENTS_IN",
        text: "10 12.000 dwt - 6 7 m draft - need hv 25 ts cranes - age irrelevant - dely med pls propose together with price ideas . thank you and",
      },
    ],
  },
];
const goldenannot = {
  "19483625.json": [
    {
      start: 68,
      end: 73,
      color: "#E74638",
      tagName: "TYPE",
      text: "ferry",
    },
    {
      start: 131,
      end: 140,
      color: "#E74638",
      tagName: "TYPE",
      text: "catamaran",
    },
    {
      start: 246,
      end: 250,
      color: "#E74638",
      tagName: "YOB",
      text: "2011",
    },
    {
      start: 251,
      end: 258,
      color: "#E74638",
      tagName: "YOB_INDI",
      text: "onwards",
    },
    { start: 685, end: 689, tagName: "d", color: "#e55f5f", text: "3251" },
  ],
};

const labelMap = {};
labelist.forEach(labelDict => {
  const entityName = labelDict.labelName || "";
  const color = labelDict.color || "";
  labelMap[entityName] = color;
});

Object.keys(goldenannot).forEach(fileName => {
  goldenannot[fileName].forEach(annotationDict => {
    const goldenEntity = annotationDict.tagName || "";
    if (goldenEntity in labelMap) {
      const updateColor = labelMap[goldenEntity];
      annotationDict.color = updateColor;
    }
  });
});
trans.forEach(file => {
  const updatedEntities = file.entities.map(entity => {
    const goldenEntity = entity.tagName || "";
    if (goldenEntity in labelMap) {
      const updateColor = labelMap[goldenEntity];
      return { ...entity, color: updateColor };
    }
    return entity;
  });

  file.entities = updatedEntities;
});

console.log(trans);
console.log(labelMap);
console.log(goldenannot);
