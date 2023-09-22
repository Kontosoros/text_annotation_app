import React, { useState, useRef } from "react";
import WindowLabels from "../Labels/WindowLabels";

const SelectedText = ({ selectedtext, labelsList }) => {
  const [selectedWord, setSelectedWord] = useState("");
  const [selectedPosition, setSelectedPosition] = useState({
    start: null,
    end: null,
  });
  const [isWindowLabelsOpen, setIsWindowLabelsOpen] = useState(false);
  const [markedSegments, setMarkedSegments] = useState([]);

  const contentEditableRef = useRef(null);

  const handleColorAssigned = (styledText) => {
    if (selectedPosition.start !== null && selectedPosition.end !== null) {
      const updatedMarkedSegments = [...markedSegments];
      updatedMarkedSegments.push({
        start: selectedPosition.start,
        end: selectedPosition.end,
        styledText: styledText,
      });
      
      updatedMarkedSegments.sort((a, b) => a.start - b.start);

      setMarkedSegments(updatedMarkedSegments);
      setIsWindowLabelsOpen(false);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    const range = selection.getRangeAt(0);

    if (selectedText) {
      const span = document.createElement("span");
      span.style.backgroundColor = "grey"; // Set your desired highlight color
      range.surroundContents(span);
      selection.removeAllRanges();

      setSelectedWord(selectedText);
      setSelectedPosition({
        start: span.parentNode.textContent.indexOf(selectedText),
        end: span.parentNode.textContent.indexOf(selectedText) + selectedText.length,
      });
      setIsWindowLabelsOpen(true); // Open the popup window when a word is selected
    } else {
      setSelectedWord("");
      setSelectedPosition({ start: null, end: null });
      setIsWindowLabelsOpen(false);
    }
  };

  return (
    <div>
      <div
        className="large-textarea"
        ref={contentEditableRef}
        contentEditable="true"
        onMouseUp={handleTextSelection} // Use onMouseUp to handle text selection
        dangerouslySetInnerHTML={{ __html: selectedtext }}
      />

      {isWindowLabelsOpen && selectedWord && (
        <WindowLabels
          selectedtext={selectedWord}
          textposition={selectedPosition}
          labelsAnnotation={labelsList}
          onColorAssigned={handleColorAssigned}
        />
      )}
    </div>
  );
};

export default SelectedText;