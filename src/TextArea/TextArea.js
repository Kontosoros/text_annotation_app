import "./TextArea.css";
import React from "react";
import SelectedText from "./SelectedText";

const TextArea = props => {
  
  
  return (
    <div>
      <SelectedText selectedtext = {props.text}/>
    </div>
  );
};

export default TextArea;
