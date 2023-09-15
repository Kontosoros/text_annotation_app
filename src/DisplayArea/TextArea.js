import "./TextArea.css";
import React, { useState } from "react";
const TextArea = props => {
  const [text, setText] = useState("");
  const [selectedWord, setSelectedWord] = useState("");
  const [label, setLabel] = useState("");
  const [selectedPosition, setSelectedPosition] = useState({ start: null, end: null });
  
  const handleTextChange = e => {
    setText(e.target.value);
  };

  const handleTextSelection = () => {
    const textarea = document.querySelector(".large-textarea");
    
    const startPosition = textarea.selectionStart;
    const endPosition = textarea.selectionEnd;
    const selection = window.getSelection();
    
    const selectedWord = selection.toString().trim();
    console.log(selectedWord)
    if (startPosition !== endPosition) {
      const selectedText = text.substring(startPosition, endPosition);
      
      setSelectedWord(selectedWord);
      setSelectedPosition({ start: startPosition, end: endPosition });
    } else {
      setSelectedWord("");
      setSelectedPosition({ start: null, end: null });
    }
  };
  
  const handleLabelChange = e => {
    setLabel(e.target.value);
  };

  const handleAddLabel = () => {
    // You can handle label addition logic here, e.g., store it in state or display it
    console.log(`Word: ${selectedWord}, Label: ${label}, POSITION START: ${selectedPosition.start}, POSITION END: ${selectedPosition.end}`);
  };
  return (
    <div>
      <textarea
        className="large-textarea"
        value={props.text}
        onChange={handleTextChange}
        onMouseUp={handleTextSelection}
      />
      <div className="labeling">
        <input
          type="text"
          placeholder="Label"
          value={label}
          onChange={handleLabelChange}
        />
        <button onClick={handleAddLabel}>Add Label</button>
      </div>
      <div className="selected-word">
        Selected Word: <strong>{selectedWord}</strong>
      </div>
    </div>
  );
};

export default TextArea;
