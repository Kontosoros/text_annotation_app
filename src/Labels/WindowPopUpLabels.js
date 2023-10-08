import React, { useState, useEffect } from "react";
import "./WindowPopUpLabels.css";

export default function WindowPopUpLabels(props) {
  const [selectedWord, setSelectedWord] = useState("");
  const [selectedPosition, setSelectedPosition] = useState({
    start: null,
    end: null,
  });

  useEffect(() => {
    setSelectedWord(props.selectedtext);
    setSelectedPosition(props.textposition);
  }, [props.selectedtext, props.textposition]);

  const handleColorAssignment = ({ label }) => {
    if (selectedPosition.start !== null && selectedPosition.end !== null) {
      // Apply styling to the selected word
      const span = document.createElement("span");
      
      span.style.backgroundColor = label.color; // Set the background color to the selected label's color
      span.textContent = selectedWord;
      const content = document.querySelector(".large-textarea");
      content.replaceChild(span, content.childNodes[selectedPosition.start]);
      
      // Call a callback function to update the styled text
      props.onColorAssigned(label);
      
      // Close the popup window after assigning the color
    }
  };

  return (
    <div className={`label-selection-popup`}>
      <ul>
        {props.labelsAnnotation.map((label, index) => (
          <li key={index} style={{ color: label.color, cursor: "pointer" }}>
            <button
              onClick={() => {
                handleColorAssignment({ label });
              }}
            >
              {label.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

