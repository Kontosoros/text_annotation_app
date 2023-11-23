

const UpdateLoadDataColor = ({props,loadingData}) => {
  // i.e. make a deduplicated dictionary label map = {"TYPE":color , ....}
  const labelMap = {};
  props.labelsList.forEach(labelDict => {
    const entityName = labelDict.labelName || "";
    const color = labelDict.color || "";
    labelMap[entityName] = color;
  });
 // Modify the loading data's color whenever there is a change in the color code within the label map.
 for (let fileDict of loadingData) {
        if (fileDict.tagName in labelMap) {
          const updateColor = labelMap[fileDict.tagName];
          fileDict.color = updateColor;
        }
      
    
  }
  
  return loadingData
};

export default UpdateLoadDataColor;
