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

  const handleColorAssignment = () => {
    if (selectedPosition.start !== null && selectedPosition.end !== null) {
      console.log()

      // Apply styling to the selected word
      const styledText = `<span style="color: red; ">${props.selectedtext}</span>`;

      // Call a callback function to update the styled text
      props.onColorAssigned(styledText);
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
                handleColorAssignment();
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
