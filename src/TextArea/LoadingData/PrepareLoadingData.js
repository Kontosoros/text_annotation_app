import React from "react";

const PrepareLoadingData = (props) => {
  const prepareData = (entities) => {
    const loadingData = [];

    for (const tagName in entities) {
      if (entities.hasOwnProperty(tagName)) {
        entities[tagName].forEach((tag) => {
          loadingData.push({
            start: tag.indices[0],
            end: tag.indices[1],
            color: "#e74e4e",
            tagName: tagName,
            text: tag.string,
          });
        });
      }
    }

    return loadingData;
  };

  const loadingData = prepareData(props.entities);
  
  // You can return the loadingData here if needed, or just use it within your TextArea component.

  return loadingData;
};

export default PrepareLoadingData;