import React, { useState, useEffect } from "react";
import TextAnnotation from "./TextAnnotation";
import AnnotationsDisplayArea from "./DisplayArea/AnnotationsDisplayArea";
import UpdateLoadDataColor from "../Utils/UpdateLoadDataColor";
const TextArea = props => {
  // Initialize loadingData with a default value
  const [loadingData, setLoadingData] = useState([]);
  // Maintain a dictionary of annotations for each file
  const [goldenAnnotations, setGoldenAnnotations] = useState({});

  useEffect(() => {
    // Check if labelsList is defined and not empty before updating the color of loadingData
    if (props.labelsList && props.labelsList.length > 0 && props.entities) {
      const updatedLoadDataColor = UpdateLoadDataColor({ props });
      setLoadingData(updatedLoadDataColor);
      props.updateLoadingData({ [props.filename]: updatedLoadDataColor });
    }
  }, [props.labelsList]);

  // Use useEffect to watch for changes in props.filename and goldenAnnotations
  useEffect(() => {
    const currentAnnotations = goldenAnnotations[props.filename] || [];
    if (
      currentAnnotations.length === 0 &&
      goldenAnnotations[props.filename]?.length === 0
    ) {
      setLoadingData([]);
    } else if (currentAnnotations.length === 0) {
      // On the initial load, set loadingData to loadData
      setLoadingData(props.entities);
    } else {
      // On subsequent interactions, set loadingData to currentAnnotations
      setLoadingData(currentAnnotations);
    }
    props.updateLoadingData(goldenAnnotations);
  }, [props.filename, goldenAnnotations]);

  const handleAnnotationUpdate = annotation => {
    // Define a function to receive the annotation data from the child
    setGoldenAnnotations(annotation);
  };
  return (
    <div>
      <TextAnnotation
        filename={props.filename}
        msgBody={props.text}
        labelsList={props.labelsList}
        loadingData={loadingData}
        handleAnnotationUpdate={handleAnnotationUpdate}
      />
      <AnnotationsDisplayArea
        filename={props.filename}
        goldenData={goldenAnnotations}
      />
    </div>
  );
};

export default TextArea;
