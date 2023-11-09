import React from "react";
const RefreshDataColor = ({ props, loadingData }) => {
  if (loadingData && loadingData.length > 0 && props.labelsList) {
    // Add a null/undefined check for labelList

    const labelColors = {};
    props.labelsList.forEach(label => {
      labelColors[label.labelName] = label.color;
    });
    
    
    const updatedLoadingData = loadingData.map(itemDict => {
      if (labelColors[itemDict.tagName]) {
        itemDict.color = labelColors[itemDict.tagName];
      }
      return itemDict;
    });

    // You can update the state or return the updatedLoadingData
    return updatedLoadingData;
  }

  // Return the original loadingData if either labelList or loadingData is undefined
};

export default RefreshDataColor;
