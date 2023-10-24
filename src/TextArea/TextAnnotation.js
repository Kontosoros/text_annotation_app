import React, { useState, useEffect, useRef } from "react";
import WindowPopUpLabels from "../Labels/WindowPopUpLabels";
import TextSelectionHandler from "./TextHandler/TextSelectionHandler";

const TextAnnotation = ({
  filename,
  msgBody,
  labelsList,
  onGoldenDictionary,
}) => {
  const [valueByMsg, setValueByMsg] = useState({});
  const [selectText, setSelectText] = useState(false);
  const [isPopupVisible, setPopupVisibility] = useState(true);
  const [selectedLabelDict, setselectedLabel] = useState({
    labelName: "",
    color: "",
  });
  const [cursorPosition, setCursorPosition] = useState(null);

  const updateValueForMsg = (msg, newValue) => {
    setValueByMsg((prevValues) => ({
      ...prevValues,
      [msg]: newValue,
    }));
  };

  const handleMouseUp = (e) => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText) {
      const yOffset = 140; // Adjust this value to set the desired vertical offset
      setSelectText(true);
      setCursorPosition({ x: e.clientX, y: e.clientY + yOffset });
      setPopupVisibility(true);
    }
  };

  useEffect(() => {
    const msgBodyElement = document.querySelector(".large-textarea");
    if (msgBodyElement) {
      msgBodyElement.addEventListener("mouseup", handleMouseUp);
      return () => {
        msgBodyElement.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, []);

  const closePopup = () => {
    setPopupVisibility(false);
  };

  const setSelectedLabelDictCallback = (labelDict) => {
    setselectedLabel(labelDict);
  };

  return (
    <div className="large-textarea">
      {labelsList && isPopupVisible  && (
        <WindowPopUpLabels
          labelsList={labelsList}
          closePopup={closePopup}
          setSelectedLabelDict={setSelectedLabelDictCallback}
          cursorPosition={cursorPosition}
        />
      )}
      {msgBody && (
        <TextSelectionHandler
          msgBody={msgBody}
          value={valueByMsg[msgBody] || []}
          updateValue={(newValue) => updateValueForMsg(msgBody, newValue)}
          selectedLabelDict={selectedLabelDict}
        />
      )}
    </div>
  );
};

export default TextAnnotation;