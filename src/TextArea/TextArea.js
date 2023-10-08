import "./TextArea.css";
import React from "react";
import TextAnnotation from "./TextAnnotation";


const TextArea = props => {
  
  
  return (
    <>
      <TextAnnotation selectedtext={props.text} labelsList = {props.labelsList}/>
    </>
  );
};

export default TextArea;
