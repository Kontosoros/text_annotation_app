import React, { useState } from "react";
import WindowLabels from "../Labels/WindowLabels";

const SelectedText = ({ selectedtext, labelsList }) => {
  const [text, setText] = useState("");
  const [selectedWord, setSelectedWord] = useState("");
  const [label, setLabel] = useState("");
  const [selectedPosition, setSelectedPosition] = useState({
    start: null,
    end: null,
  });
  const [isWindowLabelsOpen, setIsWindowLabelsOpen] = useState(false);

  const handleColorAssigned = styledText => {
    if (selectedPosition.start !== null && selectedPosition.end !== null) {
      // Create a copy of the current text
      let updatedText = selectedtext;
      updatedText =
        updatedText.substring(0, selectedPosition.start) +
        styledText +
        updatedText.substring(selectedPosition.end);
      console.log("updatedText", updatedText);
      setText(updatedText);
      // Close the WindowLabels popup after assigning the color
      setIsWindowLabelsOpen(false);
    }
  };

  const handleTextChange = e => {
    setText(e.target.value);
  };
  const handleTextSelection = () => {
    const textarea = document.querySelector(".large-textarea");
    const startPosition = textarea.selectionStart;
    const endPosition = textarea.selectionEnd;
    const selection = window.getSelection();
    const selectedWord = selection.toString().trim();

    if (startPosition !== endPosition) {
      

      setSelectedWord(selectedWord);
      setSelectedPosition({ start: startPosition, end: endPosition });
    } else {
      setSelectedWord("");
      setSelectedPosition({ start: null, end: null });
    }
    // Open the WindowLabels popup when text is selected
    setIsWindowLabelsOpen(true);
  };

  console.log(
    `Word: ${selectedWord}, Label: ${label}, POSITION START: ${selectedPosition.start}, POSITION END: ${selectedPosition.end}`
  );

  return (
    <div>
      <textarea
        className="large-textarea"
        value={selectedtext}
        onChange={handleTextChange}
        onSelectCapture={handleTextSelection}
      />

      {isWindowLabelsOpen && selectedWord && (
        <WindowLabels
          selectedtext={selectedWord}
          textposition={selectedPosition}
          labelsAnnotation={labelsList}
          onColorAssigned={handleColorAssigned}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};
export default SelectedText;
