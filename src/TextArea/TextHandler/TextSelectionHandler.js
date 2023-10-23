import React, { useState } from "react";
import { TextAnnotateBlend } from "react-text-annotate-blend";

const TextSelectionHandler = ({ msgBody, value, updateValue }) => {
  const [tag, setTag] = useState("tagA");
  const COLORS = {
    tagA: "rgb(179, 245, 66)",
    tagB: "#42f5f5",
    tagC: "#4b46cd",
  };
  
  const handleChange = (values) => {
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
        getSpan={(span) => ({
          ...span,
          tag: tag,
          color: COLORS[tag],
        })}
      />
    </div>
  );
};

export default TextSelectionHandler;