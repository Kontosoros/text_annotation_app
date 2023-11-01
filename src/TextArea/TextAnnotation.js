import React, { useState, useEffect, useRef } from "react";
import WindowPopUpLabels from "../Labels/WindowPopUpLabels";
import TextSelectionHandler from "./TextHandler/TextSelectionHandler";

const TextAnnotation = ({
  filename,
  msgBody,
  labelsList,
  handleAnnotationUpdate,
}) => {
  const [annotationsByMsgDict, setMsgAnnotationList] = useState({});
  const [selectText, setTextSelection] = useState(false);
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(null);
  const [wordOffsets, setWordOffsets] = useState({
    start: "",
    end: "",
    text: "",
  });
  const loadingData = [{ start: 0, end: 7, color: "#FF0000" }];
  const updateMsgAnnotations = (filename, newAnnotationList) => {
    setMsgAnnotationList(prevAnnotationList => ({
      ...prevAnnotationList,
      [filename]: newAnnotationList,
    }));
  };

  const handleMouseUp = e => {
    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString().trim();

      if (selectedText) {
        const yOffset = 140; // Adjust this value to set the desired vertical offset
        const msgBodyElement = document.querySelector(".large-textarea");

        if (msgBodyElement) {
          const rangeClone = range.cloneRange();
          rangeClone.selectNodeContents(msgBodyElement);
          rangeClone.setEnd(range.startContainer, range.startOffset);

          const startIndex = rangeClone.toString().length;
          const endIndex = startIndex + selectedText.length;

          setWordOffsets({
            start: startIndex,
            end: endIndex,
            text: selectedText,
          });

          setTextSelection(true);
          setCursorPosition({ x: e.clientX, y: e.clientY + yOffset });
          setPopupVisibility(true);
        }
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
    const newAnnotationDict = {
      start: wordOffsets.start,
      end: wordOffsets.end,
      //tag: labelDict.labelName,
      color: labelDict.color,
      text: wordOffsets.text,
    };
    // Update the state with the new dictionary
    const annotationList = deduplicateDictionaries([
      ...(annotationsByMsgDict[filename] || []),
      newAnnotationDict,
      ...loadingData,
    ]);
    updateMsgAnnotations(filename, annotationList);
    setPopupVisibility(false);
  };

  // Call the parent's callback function to send the update
  handleAnnotationUpdate(annotationsByMsgDict);
  // Deduplicate dictionaries based on 'start' and 'end' properties
  const deduplicateDictionaries = dictionaries => {
    const uniqueDicts = [];
    const seenDicts = new Set();

    for (const dict of dictionaries) {
      const key = `${dict.start}-${dict.end}`;
      if (!seenDicts.has(key)) {
        seenDicts.add(key);
        uniqueDicts.push(dict);
      }
    }

    return uniqueDicts;
  };
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
          value={annotationsByMsgDict[filename] || []}
          updateValue={newValue => updateMsgAnnotations(filename, newValue)} // Pass the updateValueForMsg function
        />
      )}
    </div>
  );
};

export default TextAnnotation;
