import React, { useState, useEffect } from "react";
import WindowPopUpLabels from "../Labels/WindowPopUpLabels";
import TextSelectionHandler from "./TextHandler/TextSelectionHandler";

const TextAnnotation = ({
  filename,
  msgBody,
  labelsList,
  handleAnnotationUpdate,
}) => {
  const [valueByMsg, setValueByMsg] = useState({});
  const [selectText, setSelectText] = useState(false);
  const [isPopupVisible, setPopupVisibility] = useState(true);
  const [selectedLabelDict, setselectedLabel] = useState({
    labelName: "",
    color: "",
  });
  const [cursorPosition, setCursorPosition] = useState(null);

  const updateValueForMsg = (filename, newValue) => {
    setValueByMsg(prevValues => ({
      ...prevValues,
      [filename]: newValue,
    }));
  };

  const handleMouseUp = e => {
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

  const setSelectedLabelDictCallback = labelDict => {
    setselectedLabel(labelDict);
  };
  // Call the parent's callback function to send the update
  handleAnnotationUpdate(valueByMsg);
  return (
    <div className="large-textarea">
      {labelsList && isPopupVisible && (
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
          value={valueByMsg[filename] || []}
          updateValue={newValue => updateValueForMsg(filename, newValue)}
          selectedLabelDict={selectedLabelDict}
        />
      )}
    </div>
  );
};

export default TextAnnotation;
