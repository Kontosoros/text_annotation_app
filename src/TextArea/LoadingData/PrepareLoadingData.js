import React from "react";

const PrepareLoadingData = ({ uploadedFiles }) => {
  // Check if uploadedFiles is defined
  if (uploadedFiles && uploadedFiles.length > 0) {
    const loadingLabels = [];
    const uniqueLabels = {}; // Dictionary to track unique labels

    const transformedList = uploadedFiles.map(item => {
      const entities = [];
      for (const entityName in item.entities) {
        if (item.entities.hasOwnProperty(entityName)) {
          item.entities[entityName].forEach(tag => {
            entities.push({
              start: tag.indices[0],
              end: tag.indices[1],
              color: "#C24444",
              tagName: entityName,
              text: tag.string,
            });

            // Check if the label is unique
            if (!uniqueLabels[entityName]) {
              uniqueLabels[entityName] = true;

              // Add the tag name to loadingLabels with a default color
              loadingLabels.push({ labelName: entityName, color: "#929190" });
            }
          });
        }
      }
      return {
        name: item.name,
        content: item.content,
        entities: entities,
      };
    });
    console.log("kkk",loadingLabels);
    return { transformedList, loadingLabels };
  }

  // If uploadedFiles is undefined or empty, you can return a default value or null
  return null;
};

export default PrepareLoadingData;
