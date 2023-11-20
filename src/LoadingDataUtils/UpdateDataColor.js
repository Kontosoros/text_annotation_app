const UpdateDataColor = ({ labeList, transformedList, goldenAnnotations }) => {
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
  // Modify the loading data's color whenever there is a change in the color code within the label map.
  for (let fileDict of transformedList) {
    let entitiesFile = fileDict.entities;
    if (entitiesFile.length > 0) {
      for (let entitiesDict of entitiesFile) {
        if (entitiesDict.tagName in labelMap) {
          const updateColor = labelMap[entitiesDict.tagName];
          entitiesDict.color = updateColor;
        }
      }
    }
  }
  /* i.e. ====> transformedList =  [{ name:"19483625.json" , content:"text ... " , "entities": [{"start": 0,"end": 8,"tagName": "TYPE","color": "#813b3b","text": "19483508"},......]}
                                    { name:"222222.json" , content:"text ... " , "entities": [{"start": 0,"end": 8,"tagName": "TYPE","color": "#813b3b","text": "19483508"},......]}
                                    ]
  */
  for (let loadingFileDict of transformedList) {
    const loadingFileName = loadingFileDict.name;
    const goldenAnnotationList = goldenAnnotations[loadingFileName] || [];
    if (goldenAnnotationList.length > 0) {
      loadingFileDict.entities = goldenAnnotationList;
    }
  }

  return transformedList;
};

export default UpdateDataColor;
