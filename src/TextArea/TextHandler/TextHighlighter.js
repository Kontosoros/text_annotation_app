import React from "react";
import { TextAnnotateBlend } from "react-text-annotate-blend";

const TextHighlighter = ({ msgBody, value, updateValue }) => {
  if (!msgBody) {
    return null;
  }
  
  const handleChange = values => {
    
    updateValue(values);
  };
  

  return (
    <div>
      <TextAnnotateBlend
        style={{
          fontSize: "1.2rem",
        }}
        content={msgBody}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default TextHighlighter;
