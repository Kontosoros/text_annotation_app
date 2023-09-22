import React, { useState, useRef } from "react";
import WindowLabels from "../Labels/WindowLabels";

const SelectedText = ({ selectedtext, labelsList }) => {
  const [selectedWord, setSelectedWord] = useState("");
  const [selectedPosition, setSelectedPosition] = useState({
    start: null,
    end: null,
  });
  const [isWindowLabelsOpen, setIsWindowLabelsOpen] = useState(false);
  const [highlightColor, setHighlightColor] = useState("white");
  const contentEditableRef = useRef(null);

  const handleColorAssigned = label => {
    setHighlightColor(label.color); // Set the selected color
    setIsWindowLabelsOpen(false)
  };

  const handleTextSelection = () => {
    let selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) {
      // No valid selection
      setSelectedWord("");
      setSelectedPosition({ start: null, end: null });
      setIsWindowLabelsOpen(false);
      return;
    }

    let selectedText = selection.toString();
    let range = selection.getRangeAt(0);

    if (selectedText) {
      let startOffset = range.startOffset;
      let endOffset = range.endOffset;
      console.log(
        "startOffset",
        startOffset,
        "endOffset",
        endOffset,
        "selectedText",
        selectedText
      );
      // Check if the selection spans multiple nodes
      if (startOffset !== endOffset) {
        // Create a DocumentFragment to hold the selected content
        let fragment = range.extractContents();
        // Create a new span and apply the selected color
        let span = document.createElement("span");
        span.style.backgroundColor = `${highlightColor}`; // Set your desired highlight color
        // Append the extracted content to the new span
        span.appendChild(fragment);
        // Insert the new span at the start of the selection
        range.insertNode(span);
        // Clear the selection
        selection.removeAllRanges();
        // Calculate the start and end positions of the highlighted text
        let start = Array.from(span.parentNode.childNodes).indexOf(span);
        let end = start + selectedText.length;
        setSelectedWord(selectedText);
        setSelectedPosition({ start, end });
        setIsWindowLabelsOpen(true); // Open the popup window when text is selected
      }
    
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
