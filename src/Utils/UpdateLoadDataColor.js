

const UpdateLoadDataColor = ({props}) => {
  // i.e. make a deduplicated dictionary label map = {"TYPE":color , ....}
  const labelMap = {};
  props.labelsList.forEach(labelDict => {
    const entityName = labelDict.labelName || "";
    const color = labelDict.color || "";
    labelMap[entityName] = color;
  });
 // Modify the loading data's color whenever there is a change in the color code within the label map.
 for (let fileDict of props.entities) {
        if (fileDict.tagName in labelMap) {
          const updateColor = labelMap[fileDict.tagName];
          fileDict.color = updateColor;
        }
      
    
  }
  
  return props.entities
};

export default UpdateLoadDataColor;
