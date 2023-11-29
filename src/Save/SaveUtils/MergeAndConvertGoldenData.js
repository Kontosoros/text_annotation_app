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
      msgDict.entities = entitiesDict;
    } else {
      msgDict.document_id = fileUploadedDict.name;
      msgDict.text = fileUploadedDict.content;
      msgDict.entities = fileUploadedDict.entities;
    }

    adviceData.push(msgDict);
  }
  return adviceData;
}

export default MergeAndConvertGoldenData;
