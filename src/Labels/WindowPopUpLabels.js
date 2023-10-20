import React, { useState, useEffect } from "react";
import "./WindowPopUpLabels.css";

export default function WindowPopUpLabels(props) {
  const [selectedWord, setSelectedWord] = useState("");
  const [selectedPosition, setSelectedPosition] = useState({
    start: null,
    end: null,
  });

  useEffect(() => {
    setSelectedWord(props.msgBody);
    setSelectedPosition(props.textposition);
  }, [props.msgBody, props.textposition]);

  const handleColorAssignment = ({ label }) => {
    if (selectedPosition.start !== null && selectedPosition.end !== null) {
      const content = document.querySelector(".large-textarea");
      
      // Check if the selected text is already wrapped in a span with background color
      if (
        selectedPosition.start >= 0 &&
        selectedPosition.start < content.childNodes.length &&
        content.childNodes[selectedPosition.start].classList.contains("highlighted")
      ) {
        // Update the background color of the existing span
        const span = content.childNodes[selectedPosition.start];
        span.style.backgroundColor = label.color;
      } else {
        // Create a new span and apply the selected color
        const selectedText = selectedWord;
        
        const span = document.createElement("span");
        span.style.backgroundColor = label.color;
        span.textContent = selectedText;
        span.classList.add("highlighted");
        // Replace the existing content with the new span
        content.replaceChild(span, content.childNodes[selectedPosition.start]);
      }
      // Call a callback function to update the styled text
      props.onColorAssigned(label);
    }
  };
  const deleteColorAssignment = ({ label }) => {
    if (selectedPosition.start !== null && selectedPosition.end !== null) {
      const content = document.querySelector(".large-textarea");
      const selectedText = selectedWord;
      // Get all span elements with the "highlighted" class
      const highlightedSpans = content.querySelectorAll(".highlighted");
      highlightedSpans.forEach((span) => {
        if (span.textContent === selectedText) {
          // Reset the background color of the span
          span.style.backgroundColor = "";
          // Replace the span with its text content
          const textNode = document.createTextNode(span.textContent);
          span.parentNode.replaceChild(textNode, span);
        }
      });
    }
  
    // Call a callback function to update the styled text
    props.onColorAssigned(label);
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
            <button
              onClick={() => {
                deleteColorAssignment({ label });
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
