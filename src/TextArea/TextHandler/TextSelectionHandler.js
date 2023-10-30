import React, { useState, useEffect } from "react";
import { TextAnnotateBlend } from "react-text-annotate-blend";

const TextSelectionHandler = ({
  msgBody,
  value,
  updateValue,
  selectedLabelDict,
}) => {
  // const [tag, setTag] = useState("");
  // const [color, setColor] = useState("");

  // Use useEffect to update state based on selectedLabelDict
  // useEffect(() => {
  //   setTag(selectedLabelDict.labelName);
  //   setColor(selectedLabelDict.color);
  // }, [selectedLabelDict]);

  const handleChange = values => {
    updateValue(values);
  };
  console.log("value", value);

  return (
    <div>
      <TextAnnotateBlend
        style={{
          fontSize: "1.2rem",
        }}
        content={msgBody}
        onChange={handleChange}
        value={value}
        // getSpan={span => ({
        //   ...span,
        //   tag: tag,
        //   color: color,
        // })}
      />
    </div>
  );
};

export default TextSelectionHandler;
