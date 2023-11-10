import React, { useEffect, useState } from "react";

const SendData = ({ labelList, transformedList, goldenAnnotations }) => {
  const [updatedTransformedList, setUpdatedTransformedList] = useState([]);

  useEffect(() => {
    if (!goldenAnnotations) {
      // If goldenAnnotations is not available, return transformedList directly
      setUpdatedTransformedList(transformedList);
      return;
    }

    const labelMap = {};
    labelList.forEach(labelDict => {
      const entityName = labelDict.labelName || "";
      const color = labelDict.color || "";
      labelMap[entityName] = color;
    });

    Object.keys(goldenAnnotations).forEach(fileName => {
      goldenAnnotations[fileName].forEach(annotationDict => {
        const goldenEntity = annotationDict.tagName || "";
        if (goldenEntity in labelMap) {
          const updateColor = labelMap[goldenEntity];
          annotationDict.color = updateColor;
        }
      });
    });

    transformedList.forEach(file => {
      const fileName = file.name || "";
      const annotationList = goldenAnnotations[fileName] || [];

      file.entities = annotationList.map(annotationDict => {
        const goldenEntity = annotationDict.tagName || "";
        if (goldenEntity in labelMap) {
          const updateColor = labelMap[goldenEntity];
          return { ...annotationDict, color: updateColor };
        }
        return annotationDict;
      });
    });

    setUpdatedTransformedList(transformedList);
  }, [labelList, goldenAnnotations, transformedList]);

  return updatedTransformedList;
};

export default SendData;