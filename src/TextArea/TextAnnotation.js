import React, { useState, useEffect, useRef } from "react";
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
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [selectedLabelDict, setselectedLabel] = useState({});
  const [cursorPosition, setCursorPosition] = useState(null);
  const [wordOffsets, setWordOffsets] = useState({
    start: "",
    end: "",
    text: "",
  });

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
      const msgBodyElement = document.querySelector(".large-textarea");
      if (msgBodyElement) {
        const msgBodyText = msgBodyElement.textContent;
        console.log(msgBodyText);
        const startIndex = msgBodyText.indexOf(selectedText);
        const endIndex = startIndex + selectedText.length;
        console.log(startIndex, endIndex);
        setWordOffsets({
          start: startIndex,
          end: endIndex,
          text: selectedText,
        });
        setSelectText(true);
        setCursorPosition({ x: e.clientX, y: e.clientY + yOffset });
        setPopupVisibility(true);
      }
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
    setselectedLabel({
      start: wordOffsets.start,
      end: wordOffsets.end,
      tag: labelDict.labelName,
      color: labelDict.color,
    });
    const newDictionary = {
      start: wordOffsets.start,
      end: wordOffsets.end,
      //tag: labelDict.labelName,
      color: labelDict.color,
      text: wordOffsets.text,
    };

    // Update the state with the new dictionary
    const updatedValue = [...(valueByMsg[filename] || []), newDictionary];
    updateValueForMsg(filename, updatedValue);
    setPopupVisibility(false);
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
      {!isPopupVisible && (
        <TextSelectionHandler
          msgBody={msgBody}
          value={valueByMsg[filename] || []}
          updateValue={newValue => updateValueForMsg(filename, newValue)} // Pass the updateValueForMsg function
          selectedLabelDict={selectedLabelDict}
        />
      )}
    </div>
  );
};

export default TextAnnotation;
