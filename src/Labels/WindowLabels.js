import React, { useState, useEffect } from "react";
import "./WindowLabels.css";
export default function WindowLabels(props) {
  const [selectedWord, setSelectedWord] = useState(""); // State to store the selected word
  const [selectedPosition, setSelectedPosition] = useState({
    start: null,
    end: null,
  }); // State to store the position of the selected word

  useEffect(() => {
    // Update the selected word and position when props change
    setSelectedWord(props.selectedtext);
    setSelectedPosition(props.textposition);
  }, [props.selectedtext, props.textposition]);

  const handleColorAssignment = ({ label }) => {
    if (selectedPosition.start !== null && selectedPosition.end !== null) {
      // Apply styling to the selected word
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
