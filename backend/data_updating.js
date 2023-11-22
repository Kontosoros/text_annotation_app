function findEntitiesWithMultipleOverlaps(value, newAnnotationDict ) {
  value = Object.values(value);
  
  // Iterate through each dictionary and check for overlaps with the newAnnotationDict
  const overlappingEntities = annotationList
    .filter(dict => {
      // Check if the ranges overlap
      return (
        (dict.start <= newAnnotationDict.start &&
          dict.end >= newAnnotationDict.start) ||
        (newAnnotationDict.start <= dict.start &&
          newAnnotationDict.end >= dict.start)
      );
    })
    .map(dict => {
      // Exclude the newAnnotationDict from the overlappingEntities array
      if (dict !== newAnnotationDict) {
        return dict.tagName;
      }
      return null; // Return null for the newAnnotationDict
    })
    .filter(tagName => tagName !== null); // Remove null values from the array

  console.log('overlappingEntities ', overlappingEntities);
  if (newAnnotationDict.tagName === "SEGMENTS_IN" && overlappingEntities.includes("SEGMENTS_IN")){
    return overlappingEntities
  }
  else{
    console.log(true)
    return []
  }
    
  
}

// Example usage
const annotationList = [
  {
      "start": 38,
      "end": 45,
      "tagName": "d",
      "color": "#e84e4e",
      "text": "willing"
  },
  {
      "start": 68,
      "end": 73,
      "tagName": "TYPE",
      "color": "#29c7da",
      "text": "ferry"
  },
  {
      "start": 131,
      "end": 140,
      "tagName": "TYPE",
      "color": "#29c7da",
      "text": "catamaran"
  },{
    "start": 140,
    "end": 170,
    "tagName": "SEGMENTS_IN",
    "color": "#29c7da",
    "text": "catamaran"
}
  
  
]
const newAnnotationDict = {"start": 20,
"end": 160,
"tagName": "SEGMENTS_IN",
"color": "#29c7da",
"text": "close client , who is willing to buy fast"}
const entitiesWithMultipleOverlaps = findEntitiesWithMultipleOverlaps(annotationList,newAnnotationDict);
console.log("Entities with Multiple Overlaps:", entitiesWithMultipleOverlaps);