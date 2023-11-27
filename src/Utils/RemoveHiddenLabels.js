function RemoveHiddenLabels({ msgAnnotations, HiddenEntitiesMap }) {
  /* 
  RemoveHiddenLabels Component:

  This component filters out dictionaries from the given 'msgAnnotations' list based on the 'HiddenEntitiesMap'.
  It creates two lists:
    1. 'dataToShow': Contains dictionaries with tagNames not present in 'HiddenEntitiesMap'.
    2. 'hiddenDataList': Contains dictionaries with tagNames present in 'HiddenEntitiesMap' (hidden data).
 
  */
  const hiddenDataList = [];
  let dataToShow = [];

  if (HiddenEntitiesMap && HiddenEntitiesMap.length > 0) {
    for (const annotationDict of msgAnnotations) {
      if (HiddenEntitiesMap.includes(annotationDict.tagName)) {
        hiddenDataList.push(annotationDict); // store the data in a seperate list
      }
    }
    dataToShow = msgAnnotations.filter(
      annotationDict => !HiddenEntitiesMap.includes(annotationDict.tagName)
    ); // Allow only the dict that their tagName is not in 'HiddenEntitiesMap'
  }

  return {
    dataToShow: dataToShow || [],
    hiddenDataList: hiddenDataList || [],
  };
}
export default RemoveHiddenLabels;
