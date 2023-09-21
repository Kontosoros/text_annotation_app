import "./TextArea.css";
import React from "react";
import SelectedText from "./SelectedText";


const TextArea = props => {
  
  
  return (
    <>
      
      <SelectedText selectedtext={props.text} labelsList = {props.labelsList}/>
      
    </>
  );
};

export default TextArea;
