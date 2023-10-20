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
    const content = document.querySelector(".large-textarea");
    const selectedText = selectedWord;
    
    // Check if the selected text is already wrapped in a span with background color
    const selectedTextSpans = Array.from(content.querySelectorAll(".highlighted"));
    const isHighlighted = selectedTextSpans.some(span => span.textContent === selectedText);

    if (isHighlighted ) {
      // If the selected text is already colored, remove the color
      selectedTextSpans.forEach(span => {
        if (span.textContent === selectedText) {
          span.style.backgroundColor = "";
          const textNode = document.createTextNode(span.textContent);
          span.parentNode.replaceChild(textNode, span);
        }
      });
    } else {
      // Create a new span and apply the selected color
      const span = document.createElement("span");
      span.style.backgroundColor = label.color;
      span.textContent = selectedText;
      span.classList.add("highlighted");
      content.replaceChild(span, content.childNodes[selectedPosition.start]);
    }

    // Call a callback function to update the styled text
    props.onColorAssigned(label);
  };

  const deleteColorAssignment = ({ label }) => {
    const content = document.querySelector(".large-textarea");
    const selectedText = selectedWord;

    // Get all span elements with the "highlighted" class
    const selectedTextSpans = Array.from(content.querySelectorAll(".highlighted"));

    if (selectedTextSpans.length > 0) {
      selectedTextSpans.forEach(span => {
        if (span.textContent === selectedText) {
          span.style.backgroundColor = "";
          const textNode = document.createTextNode(span.textContent);
          span.parentNode.replaceChild(textNode, span);
        }
      });
    } else {
      props.closeWindow();
    }

    // Call a callback function to update the styled text
    props.onColorAssigned(label);
  };

  // Determine if the word is highlighted
  const content = document.querySelector(".large-textarea");
  const selectedText = selectedWord;
  const isHighlighted = Array.from(content.querySelectorAll(".highlighted")).some(span => span.textContent === selectedText);

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
              {isHighlighted }
              {label.text}
            </button>
            <button
              onClick={() => {
                deleteColorAssignment({ label });
              }}
              disabled={!isHighlighted} // Disable the "Delete" button if not highlighted
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}