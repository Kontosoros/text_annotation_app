import React, { useState, useRef, useEffect } from "react";
import WindowPopUpLabels from "../Labels/WindowPopUpLabels";
import TextSelectionHandler from "./TextHandler/TextSelectionHandler";

const TextAnnotation = ({ msgBody, labelsList }) => {
  const [selectedWord, setSelectedWord] = useState("");
  const [selectedPosition, setSelectedPosition] = useState({
    start: null,
    end: null,
  });
  const [isWindowLabelsOpen, setIsWindowLabelsOpen] = useState(false);
  const [highlightColor, setHighlightColor] = useState("grey");
  const contentEditableRef = useRef(null);
  const storedHighlights = useRef({}); // Store highlights in a ref

  // Load stored highlights on component mount
  useEffect(() => {
    if (storedHighlights.current[msgBody]) {
      contentEditableRef.current.innerHTML = storedHighlights.current[msgBody];
    }
  }, [msgBody]);

  const handleColorAssigned = color => {
    // Set the selected color and save the highlights
    setHighlightColor(color.color);
    setIsWindowLabelsOpen(false);
    storedHighlights.current[msgBody] = contentEditableRef.current.innerHTML;
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      // No valid selection
      setSelectedWord("");
      setSelectedPosition({ start: null, end: null });
      setIsWindowLabelsOpen(false);
      return;
    }

    const selectedText = selection.toString();

    if (selectedText) {
      const content = contentEditableRef.current.textContent;
      const startOffset = content.indexOf(selectedText);
      const endOffset = startOffset + selectedText.length;
      console.log(
        "startOffset",
        startOffset,
        "endOffset",
        endOffset,
        "selected_text",
        selectedText
      );
      // Check if the selection spans multiple nodes
      if (startOffset !== endOffset) {
        // Create a DocumentFragment to hold the selected content
        const range = selection.getRangeAt(0);
        const fragment = range.extractContents();
        // Create a new span and apply the selected color
        const span = document.createElement("span");
        span.style.backgroundColor = "grey"; // Use the selected color
        // Append the extracted content to the new span
        span.appendChild(fragment);
        // Insert the new span at the start of the selection
        range.insertNode(span);
        // Clear the selection
        selection.removeAllRanges();
        // Calculate the start and end positions of the highlighted text
        const start = Array.from(span.parentNode.childNodes).indexOf(span);
        const end = start + selectedText.length;
        setSelectedWord(selectedText);
        setSelectedPosition({ start, end });
        setIsWindowLabelsOpen(true); // Open the popup window when text is selected in order to select the label
      }
    }
  };

  return (
    <div>
      <TextSelectionHandler
        msgBody={msgBody}
        contentEditableRef={contentEditableRef}
        handleTextSelection={handleTextSelection}
      />

      {isWindowLabelsOpen &&
        selectedWord && ( // If i select a word a popup window will be openned to select a label for the word.
          <WindowPopUpLabels
            msgBody={selectedWord}
            textposition={selectedPosition}
            labelsAnnotation={labelsList}
            onColorAssigned={handleColorAssigned}
          />
        )}
    </div>
  );
};

export default TextAnnotation;
