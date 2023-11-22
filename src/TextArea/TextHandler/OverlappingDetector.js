const OverlappingDetector = ({ annotationList, newAnnotationDict }) => {
  /* Iterate throw each annotation dict and try to find if there is a multiple overlapping.
  If it is true it exports an alert msg. */

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
  
  if (
    newAnnotationDict.tagName === "SEGMENTS_IN" &&
    overlappingEntities.includes("SEGMENTS_IN")
  ) {
    return overlappingEntities;
  } else if (
    newAnnotationDict.tagName === "SEGMENTS_IN" &&
    !overlappingEntities.includes("SEGMENTS_IN")
  ) {
    return [];
  } else {
    return overlappingEntities;
  }
};

export default OverlappingDetector;
