import React, { useState } from "react";
import WindowPopUpLabels from "../Labels/WindowPopUpLabels";
import TextSelectionHandler from "./TextHandler/TextSelectionHandler";

const TextAnnotation = ({ filename, msgBody, labelsList, onGoldenDictionary }) => {
  const [valueByMsg, setValueByMsg] = useState({});
  
  const updateValueForMsg = (msg, newValue) => {
    setValueByMsg((prevValues) => ({
      ...prevValues,
      [msg]: newValue,
    }));
  };

  return (
    <>
      {msgBody && (
        <TextSelectionHandler
          msgBody={msgBody}
          value={valueByMsg[msgBody] || []} // Initialize value as an empty array
          updateValue={(newValue) => updateValueForMsg(msgBody, newValue)}
        />
      )}
    </>
  );
};

export default TextAnnotation;