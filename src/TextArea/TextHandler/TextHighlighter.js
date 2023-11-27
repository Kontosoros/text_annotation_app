import React, { useState, useEffect } from "react";
import { TextAnnotateBlend } from "react-text-annotate-blend";
import RemoveHiddenLabels from "../../Utils/RemoveHiddenLabels";

const TextHighlighter = ({ msgBody, msgAnnotations, HiddenEntitiesMap, updateValue }) => {
  /*
  This component is a text annotator that highlights specific sections of the input text
  based on the provided annotations. It utilizes the 'TextAnnotateBlend' component. */

  const [ShowData, setDataToShow] = useState();
  const [hiddenData, setHiddenData] = useState();

  useEffect(() => {
    // If 'msgAnnotations' or 'hideLabelList' changes, it triggers the useEffect to update the displayed and hidden data.
    let { dataToShow, hiddenDataList } = RemoveHiddenLabels({
      msgAnnotations,
      HiddenEntitiesMap,
    });

    setHiddenData(hiddenDataList);

    if (dataToShow && dataToShow.length > 0) {
      // If i have data to show , i show 'dataToShow' list
      setDataToShow(dataToShow);
    } else if (dataToShow.length === 0) {
      // If there is no data to show , i show 'msgAnnotations' list
      setDataToShow(msgAnnotations);
    }
  }, [msgAnnotations, HiddenEntitiesMap]);

  if (!msgBody) {
    return null;
  }

  const handleChange = values => {
    if (hiddenData.length > 0 && values.length > 0) {
      // If there is hidden data, it merges it with the visible data before updating.
      const mergeList = [...values, ...hiddenData];
      updateValue(mergeList);
    } else if (hiddenData.length > 0 && values.length === 0) {
      // If i hide all the entities and i dont have any change in my annotations i show the 'hiddenData'
      setDataToShow(hiddenData);
      updateValue(hiddenData);
    } else {
      updateValue(values);
    }
  };

  return (
    <div>
      <TextAnnotateBlend
        style={{
          fontSize: "1.2rem",
        }}
        content={msgBody}
        onChange={handleChange}
        value={ShowData}
      />
    </div>
  );
};

export default TextHighlighter;
