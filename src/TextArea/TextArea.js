import "./TextArea.css";
import React, { useState } from "react";
import TextAnnotation from "./TextAnnotation";
import AnnotationsDisplayArea from "./SetAnnotations/AnnotationsDisplayArea";
const TextArea = props => {
  // Maintain a dictionary of annotations for each file
  const [goldenAnnotations, setGoldenAnnotations] = useState({});

  // Define a function to receive the annotation data from the child
  const handleAnnotationUpdate = annotation => {
    setGoldenAnnotations(annotation);
  };

  return (
    <>
      <TextAnnotation
        filename={props.filename}
        msgBody={props.text}
        labelsList={props.labelsList}
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
