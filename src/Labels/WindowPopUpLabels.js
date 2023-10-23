import React, { useState, useEffect } from "react";
import "./WindowPopUpLabels.css";

export default function WindowPopUpLabels({
  labelsList,
  selectText,
  closePopup,
}) {
  const handleColorAssignment = ({ labelDict }) => {
    return labelDict;
  };

  return (
    <div className={`label-selection-popup`}>
      <ul>
        {labelsList.map((labelDict, index) => (
          <li key={index} style={{ color: labelDict.color, cursor: "pointer" }}>
            <button
              onClick={() => {
                handleColorAssignment({ labelDict });
                closePopup(); // Call the function to close the popup
              }}
            >
              {labelDict.labelName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
