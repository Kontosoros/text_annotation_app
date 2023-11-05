import "./TextArea.css";
import React, { useState, useEffect } from "react";
import TextAnnotation from "./TextAnnotation";
import AnnotationsDisplayArea from "./DisplayArea/AnnotationsDisplayArea";

const TextArea = props => {
  // Initialize loadingData with a default value
  const [loadingData, setLoadingData] = useState([]);
  // Maintain a dictionary of annotations for each file
  const [goldenAnnotations, setGoldenAnnotations] = useState({});
  // Define a function to receive the annotation data from the child
  const handleAnnotationUpdate = annotation => {
    setGoldenAnnotations(annotation);
  };
  
  // Use useEffect to watch for changes in props.filename and goldenAnnotations
  useEffect(() => {
    const currentAnnotations = goldenAnnotations[props.filename] || [];
    console.log("goldenAnnotations", goldenAnnotations[props.filename]);
    console.log("currentAnnotations", currentAnnotations);
    if (currentAnnotations.length === 0) {
      // On the initial load, set loadingData to loadData
      setLoadingData([{ start: 223, end: 230, color: "#e94242" }]);
    } else {
      // On subsequent interactions, set loadingData to currentAnnotations
      setLoadingData(currentAnnotations);
    }
  }, [props.filename, goldenAnnotations]);

  return (
    <>
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
    </>
  );
};

export default TextArea;
