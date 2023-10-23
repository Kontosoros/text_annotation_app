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
  const [selectedLabelDict, setselectedLabel] = useState({ labelName: "", color: "" });

  const updateValueForMsg = (msg, newValue) => {
    setValueByMsg((prevValues) => ({
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
      const msgBodyElement = document.querySelector(".large-textarea");
      if (msgBodyElement) {
        msgBodyElement.addEventListener("mouseup", handleMouseUp);
        return () => {
          msgBodyElement.removeEventListener("mouseup", handleMouseUp);
        };
      }
    };
    setTimeout(registerMouseUp, 100);
  }, []);

  // const handleTextSelection = () => {
  //   if (!selectedLabelDict.color) {
  //     // If no color is selected, you can handle this case here, e.g., set a default color
  //     setselectedLabel({ ...selectedLabelDict, color: "" });
  //   }
  //   setSelectText(false);
  // };

  const closePopup = () => {
    setPopupVisibility(false);
  };

  const setSelectedLabelDictCallback = (labelDict) => {
    setselectedLabel(labelDict);
  };

  return (
    <div className="large-textarea">
      { labelsList && isPopupVisible && (
        <WindowPopUpLabels
          labelsList={labelsList}
          
          closePopup={closePopup}
          setSelectedLabelDict={setSelectedLabelDictCallback}
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