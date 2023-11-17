const UpdateDataColor = ({
  labeList,
  transformedList,
  goldenAnnotations,
}) => {
  // i.e. make a deduplicated dictionary label map = {"TYPE":color , ....}
  const labelMap = {};
  labeList.forEach(labelDict => {
    const entityName = labelDict.labelName || "";
    const color = labelDict.color || "";
    labelMap[entityName] = color;
  });

  /* i.e. ====> goldenAnnotations =  {
                                        "19483625.json": [
                                            {"start": 0,"end": 8,"tagName": "TYPE","color": "#813b3b","text": "19483508"},......]
                                        "222222".json": [
                                            {"start": 50,"end": 60,"tagName": "TYPE","color": "#813b3b","text": "19483508"},......]
                                        }
  */
  // If i change the color for a specific golden entity it updates the color.
  Object.keys(goldenAnnotations).forEach(fileName => {
    goldenAnnotations[fileName].forEach(annotationDict => {
      const goldenEntity = annotationDict.tagName || "";
      if (goldenEntity in labelMap) {
        const updateColor = labelMap[goldenEntity];
        annotationDict.color = updateColor;
      }
    });
  });

  /* i.e. ====> transformedList =  [{ name:"19483625.json" , content:"text ... " , "entities": [{"start": 0,"end": 8,"tagName": "TYPE","color": "#813b3b","text": "19483508"},......]}
                                    { name:"222222.json" , content:"text ... " , "entities": [{"start": 0,"end": 8,"tagName": "TYPE","color": "#813b3b","text": "19483508"},......]}
                                    ]
  */
  // Update the color of transformedList by replacing color of a specific entity with those from label map and merged the loading data with the golden data
  transformedList.forEach(fileDict => {
    const fileName = fileDict.name || "";
    const goldenAnnotationList = goldenAnnotations[fileName] || [];
    if (goldenAnnotationList.length > 0) {
      fileDict.entities = goldenAnnotationList.map(annotationDict => {
        const goldenEntityType = annotationDict.tagName || "";
        if (goldenEntityType in labelMap) {
          const updateColor = labelMap[goldenEntityType];
          return { ...annotationDict, color: updateColor };
        }
        return annotationDict;
      });
    }
  });

  return transformedList;
};

export default UpdateDataColor;
