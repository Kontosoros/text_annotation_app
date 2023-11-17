const ConvertLoadingDataFormat = ({ uploadedFiles }) => {
  /* 
  This module converts the format of loading data to a specific format.
  Input :
          [
                {
                "name": "19483625.json",
                "content": "19483508 have a close client ..... ",
                "entities": {
                    "COB": [..],
                    "DWT": [..],
                    "NO_COB": [..],
                    "SIZE": [..],
                    "TYPE": [{"indices": [68,73],"string": "ferry"},{},...]
                  },.....more msgs.....
              ]
    Output :
            [
              { name:"19483625.json" , content:"text ... " , "entities": [{"start": 0,"end": 8,"tagName": "TYPE","color": "#813b3b","text": "19483508"},......]}
              { name:"222222.json" , content:"text ... " , "entities": [{"start": 0,"end": 8,"tagName": "TYPE","color": "#813b3b","text": "19483508"},......]}
                                    ]
   */

  if (uploadedFiles && uploadedFiles.length > 0) {
    // Check if uploadedFiles is defined
    const loadingLabels = [];
    const uniqueLabels = {}; // Dictionary to track unique labels
    console.log("uploadedFiles ", uploadedFiles);
    const transformedList = uploadedFiles.map(item => {
      const entities = [];
      for (const entityName in item.entities) {
        if (item.entities.hasOwnProperty(entityName)) {
          item.entities[entityName].forEach(tag => {
            entities.push({
              start: tag.indices[0],
              end: tag.indices[1],
              tagName: entityName,
              color: "#808080",
              text: tag.string,
            });

            // Check if the label is unique
            if (!uniqueLabels[entityName]) {
              uniqueLabels[entityName] = true;

              // Add the tag name to loadingLabels with a default color
              loadingLabels.push({ labelName: entityName, color: "#808080" });
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

    return { transformedList, loadingLabels };
  }

  // If uploadedFiles is undefined or empty, you can return a default value or null
  return null;
};

export default ConvertLoadingDataFormat;
