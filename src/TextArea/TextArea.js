import "./TextArea.css";
import React, { useState } from "react";
import TextAnnotation from "./TextAnnotation";
import AnnotationsDisplayArea from "./DisplayArea/AnnotationsDisplayArea";

const TextArea = props => {
  // Maintain a dictionary of annotations for each file
  const [goldenAnnotations, setGoldenAnnotations] = useState({});
  // Define a function to receive the annotation data from the child
  const handleAnnotationUpdate = annotation => {
    setGoldenAnnotations(annotation);
  };
  console.log("props.labelsList", props.labelsList);
  console.log("goldenAnnotations", goldenAnnotations);
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
