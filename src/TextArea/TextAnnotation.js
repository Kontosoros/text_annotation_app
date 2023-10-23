import React, { useState, useEffect } from "react";
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
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [selectedLabelDict, setselectedLabel] = useState({
    labelName: "",
    color: "#008000",
  });

  const updateValueForMsg = (msg, newValue) => {
    setValueByMsg(prevValues => ({
      ...prevValues,
      [msg]: newValue,
    }));
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText) {
      setSelectText(true);
      setPopupVisibility(true);
    }
  };

  useEffect(() => {
    const registerMouseUp = () => {
      const msgBodyElement = document.querySelector(".large-textarea"); // Adjust the selector to target your specific element
      if (msgBodyElement) {
        msgBodyElement.addEventListener("mouseup", handleMouseUp);
        return () => {
          msgBodyElement.removeEventListener("mouseup", handleMouseUp);
        };
      }
    };
    // Use a timeout to make sure the element is available in the DOM
    setTimeout(registerMouseUp, 100);
  }, []);
  const handleTextSelection = selectText => {
    setSelectText(false);
  };
  const closePopup = () => {
    setPopupVisibility(false);
  };
  // Callback function to set the selected label dictionary
  const setSelectedLabelDictCallback = labelDict => {
    setselectedLabel(labelDict);
  };

  return (
    <div className="large-textarea">
      {selectText && isPopupVisible && (
        <WindowPopUpLabels
          labelsList={labelsList}
          selectText={selectText => handleTextSelection(selectText)}
          closePopup={closePopup}
          setSelectedLabelDict={setSelectedLabelDictCallback}
        />
      )}
      {msgBody && (
        <TextSelectionHandler
          msgBody={msgBody}
          value={valueByMsg[msgBody] || []} // Initialize value as an empty array
          updateValue={newValue => updateValueForMsg(msgBody, newValue)}
          selectedLabelDict={selectedLabelDict}
        />
      )}
    </div>
  );
};

export default TextAnnotation;
