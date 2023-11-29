function MergeAndConvertGoldenData({ goldenDataDict, uploadedFiles }) {
  const goldenConvertedFormat = {};
  for (const fileName in goldenDataDict) {
    const goldenList = goldenDataDict[fileName];
    const newDict = {};
    const TypeList = [];
    const SizeList = [];
    const NO_COB_List = [];
    const DWT_List = [];
    const COB_List = [];
    const YOB_List = [];
    const YOB_INDI_List = [];
    const SEGMENTS_IN_List = [];
    for (const annotationDict of goldenList) {
      const entitiesDict = {};
      if (annotationDict.tagName === "TYPE") {
        entitiesDict["indices"] = [annotationDict.start, annotationDict.end];
        entitiesDict["string"] = annotationDict.text;
        TypeList.push(entitiesDict);
      }
      if (annotationDict.tagName === "SIZE") {
        entitiesDict["indices"] = [annotationDict.start, annotationDict.end];
        entitiesDict["string"] = annotationDict.text;
        SizeList.push(entitiesDict);
      }
      if (annotationDict.tagName === "NO_COB") {
        entitiesDict["indices"] = [annotationDict.start, annotationDict.end];
        entitiesDict["string"] = annotationDict.text;
        NO_COB_List.push(entitiesDict);
      }
      if (annotationDict.tagName === "DWT") {
        entitiesDict["indices"] = [annotationDict.start, annotationDict.end];
        entitiesDict["string"] = annotationDict.text;
        DWT_List.push(entitiesDict);
      }
      if (annotationDict.tagName === "COB") {
        entitiesDict["indices"] = [annotationDict.start, annotationDict.end];
        entitiesDict["string"] = annotationDict.text;
        COB_List.push(entitiesDict);
      }
      if (annotationDict.tagName === "YOB") {
        entitiesDict["indices"] = [annotationDict.start, annotationDict.end];
        entitiesDict["string"] = annotationDict.text;
        YOB_List.push(entitiesDict);
      }
      if (annotationDict.tagName === "YOB_INDI") {
        entitiesDict["indices"] = [annotationDict.start, annotationDict.end];
        entitiesDict["string"] = annotationDict.text;
        YOB_INDI_List.push(entitiesDict);
      }
      if (annotationDict.tagName === "SEGMENTS_IN") {
        entitiesDict["indices"] = [annotationDict.start, annotationDict.end];
        entitiesDict["string"] = annotationDict.text;
        SEGMENTS_IN_List.push(entitiesDict);
      }
      newDict["TYPE"] = TypeList;
      newDict["SIZE"] = SizeList;
      newDict["NO_COB"] = NO_COB_List;
      newDict["DWT"] = DWT_List;
      newDict["COB"] = COB_List;
      newDict["YOB"] = YOB_List;
      newDict["YOB_INDI"] = YOB_INDI_List;
      newDict["SEGMENTS_IN"] = SEGMENTS_IN_List;
    }
    newDict["name"] = fileName;
    goldenConvertedFormat[fileName] = newDict;
  }

  const adviceData = [];
  for (const fileUploadedDict of uploadedFiles) {
    const msgDict = {};
    const entitiesDict = {};
    if (goldenConvertedFormat.hasOwnProperty(fileUploadedDict.name)) {
      const goldenEntitiesDict = goldenConvertedFormat[fileUploadedDict.name];
      msgDict.document_id = fileUploadedDict.name;
      msgDict.text = fileUploadedDict.content;
      entitiesDict.COB = goldenEntitiesDict.COB;
      entitiesDict.DWT = goldenEntitiesDict.DWT;
      entitiesDict.NO_COB = goldenEntitiesDict.NO_COB;
      entitiesDict.SIZE = goldenEntitiesDict.SIZE;
      entitiesDict.TYPE = goldenEntitiesDict.TYPE;
      entitiesDict.YOB = goldenEntitiesDict.YOB;
      entitiesDict.YOB_INDI = goldenEntitiesDict.YOB_INDI;
      entitiesDict.SEGMENTS_IN = goldenEntitiesDict.SEGMENTS_IN;
    } else {
      msgDict.document_id = fileUploadedDict.name;
      msgDict.text = fileUploadedDict.content;
      entitiesDict.COB = [];
      entitiesDict.DWT = [];
      entitiesDict.NO_COB = [];
      entitiesDict.SIZE = [];
      entitiesDict.TYPE = [];
      entitiesDict.YOB = [];
      entitiesDict.YOB_INDI = [];
      entitiesDict.SEGMENTS_IN = [];
    }
    msgDict.entities = entitiesDict;
    adviceData.push(msgDict);
  }
  return adviceData;
}

let uploadedFiles = [
  {
    name: "19483625.json",
    content:
      "19483508 have a close client , who is willing to buy fast passenger ferry as follows : + type : al . fast passenger ship ( hsc ) - catamaran , not monohull type . + pax . cap . : abt . 450 ~ 600 pax . + speed : abt . 35 ~ 40 kts . + built year : 2011 onwards ~ ( imperative ! ! ) + main engines : mtu engines prefer . + inspection : worldwide , immediate inspection . . pc candis will be treated as such in the range of above requirements . sincerely , james han any maritime co ltd . cid : image 005 . jpg @ 01 d 12 c 60 . f 1 ef 4 f 10 11 f , ( yoido - dong , hanseo riverpark ) yoiseo - ro 43 gil , youngdeoungpo - gu , seoul , 07239 , korea . : + 82 2 6092 - 8147 ~ 9 070 - 7663 - 3251 : + 82 2 6092 - 8150 : + 82 10 5173 - 8823 : < mailto : < > > < > url : < http : ",
    entities: {
      COB: [],
      DWT: [],
      NO_COB: [],
      SIZE: [],
      TYPE: [
        {
          indices: [68, 73],
          string: "ferry",
        },
        {
          indices: [131, 140],
          string: "catamaran",
        },
      ],
      YOB: [
        {
          indices: [246, 250],
          string: "2011",
        },
      ],
      YOB_INDI: [
        {
          indices: [251, 258],
          string: "onwards",
        },
      ],
      SEGMENTS_IN: [
        {
          indices: [58, 770],
          string:
            "passenger ferry as follows : + type : al . fast passenger ship ( hsc ) - catamaran , not monohull type . + pax . cap . : abt . 450 ~ 600 pax . + speed : abt . 35 ~ 40 kts . + built year : 2011 onwards ~ ( imperative ! ! ) + main engines : mtu engines prefer . + inspection : worldwide , immediate inspection . . pc candis will be treated as such in the range of above requirements . sincerely , james han any maritime co ltd . cid : image 005 . jpg @ 01 d 12 c 60 . f 1 ef 4 f 10 11 f , ( yoido - dong , hanseo riverpark ) yoiseo - ro 43 gil , youngdeoungpo - gu , seoul , 07239 , korea . : + 82 2 6092 - 8147 ~ 9 070 - 7663 - 3251 : + 82 2 6092 - 8150 : + 82 10 5173 - 8823 : < mailto : < > > < > url : < http :",
        },
      ],
    },
    COB: [],
    DWT: [
      {
        indices: [185, 194],
        string: "450 ~ 600",
      },
    ],
    NO_COB: [],
    SIZE: [],
    TYPE: [
      {
        indices: [131, 140],
        string: "catamaran",
      },
      {
        indices: [58, 73],
        string: "passenger ferry",
      },
    ],
    YOB: [
      {
        indices: [246, 250],
        string: "2011",
      },
    ],
    YOB_INDI: [
      {
        indices: [251, 258],
        string: "onwards",
      },
    ],
    SEGMENTS_IN: [
      {
        indices: [58, 258],
        string:
          "passenger ferry as follows : + type : al . fast passenger ship ( hsc ) - catamaran , not monohull type . + pax . cap . : abt . 450 ~ 600 pax . + speed : abt . 35 ~ 40 kts . + built year : 2011 onwards",
      },
    ],
  },
  {
    name: "19484255.json",
    content:
      "19484255 dear sirs , our principals are looking for vintage * lpg * tanker for lpg temporary storage with flwg terms : - need cargo tank capacity : * over 88.000 cbm * ( can consider min 70.000 cbm ) - age : * 1990 - 1999 * can accept bit older bit younger - delivery & inspection : * ww * - budget : * usd 20 million - negotiable * - commission : * 2.0 % - 1.5 % * subject to snp sum agreed looking forward to receive your candis . please inform vsls detail , price idea , and time of delivery . ",
  },
  {
    name: "19483699.json",
    content:
      "12345678 ref : 00127496 2021 05 31 08.58 fm burkmar shipping - genoa s+p nb dept . : + 39010 - 9914479 . : + 39393 9562074 : < > u r g e n t p e - gen cgo vsl - 10 12.000 dwt - 6 7 m draft - need hv 25 ts cranes - age irrelevant - dely med pls propose together with price ideas . thank you and ",
    entities: {
      COB: [],
      DWT: [
        {
          indices: [161, 174],
          string: "10 12.000 dwt",
        },
      ],
      NO_COB: [],
      SIZE: [],
      TYPE: [],
      YOB: [],
      YOB_INDI: [],
      SEGMENTS_IN: [
        {
          indices: [147, 150],
          string: "gen",
        },
        {
          indices: [161, 293],
          string:
            "10 12.000 dwt - 6 7 m draft - need hv 25 ts cranes - age irrelevant - dely med pls propose together with price ideas . thank you and",
        },
      ],
    },
    COB: [],
    DWT: [
      {
        indices: [161, 170],
        string: "10 12.000",
      },
    ],
    NO_COB: [],
    SIZE: [],
    TYPE: [
      {
        indices: [147, 154],
        string: "gen cgo",
      },
    ],
    YOB: [],
    YOB_INDI: [],
    SEGMENTS_IN: [
      {
        indices: [147, 251],
        string:
          "gen cgo vsl - 10 12.000 dwt - 6 7 m draft - need hv 25 ts cranes - age irrelevant - dely med pls propose",
      },
    ],
  },
];
const goldenDataDict = {
  "19483625.json": [
    {
      start: 131,
      end: 140,
      tagName: "TYPE",
      color: "#d2cd3e",
      text: "catamaran",
    },
    {
      start: 246,
      end: 250,
      tagName: "YOB",
      color: "#21a3bd",
      text: "2011",
    },
    {
      start: 251,
      end: 258,
      tagName: "YOB_INDI",
      color: "#9c09a8",
      text: "onwards",
    },
    {
      start: 58,
      end: 73,
      tagName: "TYPE",
      color: "#d2cd3e",
      text: "passenger ferry",
    },
    {
      start: 185,
      end: 194,
      tagName: "DWT",
      color: "#3cbb5a",
      text: "450 ~ 600",
    },
    {
      start: 58,
      end: 258,
      tagName: "SEGMENTS_IN",
      color: "#b99090",
      text: "passenger ferry as follows : + type : al . fast passenger ship ( hsc ) - catamaran , not monohull type . + pax . cap . : abt . 450 ~ 600 pax . + speed : abt . 35 ~ 40 kts . + built year : 2011 onwards",
    },
  ],
  "19483699.json": [
    {
      start: 147,
      end: 154,
      tagName: "TYPE",
      color: "#d2cd3e",
      text: "gen cgo",
    },
    {
      start: 161,
      end: 170,
      tagName: "DWT",
      color: "#3cbb5a",
      text: "10 12.000",
    },
    {
      start: 147,
      end: 251,
      tagName: "SEGMENTS_IN",
      color: "#b99090",
      text: "gen cgo vsl - 10 12.000 dwt - 6 7 m draft - need hv 25 ts cranes - age irrelevant - dely med pls propose",
    },
  ],
};
MergeAndConvertGoldenData({
  goldenDataDict,
  uploadedFiles,
});
