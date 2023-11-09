import React from "react";

const PrepareLoadingData = ({ uploadedFiles }) => {
  
  // Check if uploadedFiles is defined
  if (uploadedFiles && uploadedFiles.length > 0) {
    const transformedList = uploadedFiles.map((item) => {
      const entities = [];
      for (const tagName in item.entities) {
        if (item.entities.hasOwnProperty(tagName)) {
          item.entities[tagName].forEach((tag) => {
            entities.push({
              start: tag.indices[0],
              end: tag.indices[1],
              color: "#C24444",
              tagName: tagName,
              text: tag.string,
            });
          });
        }
      }
      return {
        name: item.name,
        content: item.content,
        entities: entities,
      };
    });

    return transformedList;
  }

  // If uploadedFiles is undefined or empty, you can return a default value or null
  return null;
};

export default PrepareLoadingData;