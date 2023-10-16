import "./TextArea.css";
import React, { useState, useEffect } from "react";
import TextAnnotation from "./TextAnnotation";

const TextArea = props => {
  // Maintain a dictionary of annotations for each file
  const [annotations, setAnnotations] = useState({});

  // Define a function to receive the annotation dictionary from the child
  const handleGoldenDictionary = (filename, annotation) => {
    // Update the annotations for the current file
    setAnnotations(prevAnnotations => ({
      ...prevAnnotations,
      [filename]: [...(prevAnnotations[filename] || []), annotation],
    }));
  };
  console.log(annotations);

  return (
    <>
      <TextAnnotation
        filename={props.filename}
        msgBody={props.text}
        labelsList={props.labelsList}
        onGoldenDictionary={(annotation) => handleGoldenDictionary(props.filename, annotation)}
      />
    </>
  );
};

export default TextArea;
