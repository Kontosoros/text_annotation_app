import React, { useState, useEffect } from "react";
import "./WindowPopUpLabels.css";

export default function WindowPopUpLabels({
  labelsList,
  closePopup,
  setSelectedLabelDict,
}) {
  const handleSelectedLabel = ({ labelDict }) => {
    return setSelectedLabelDict(labelDict);
  };

  return (
    <div className={`label-selection-popup`}>
      <button className="close-popup-button" onClick={() => closePopup()}>
        X
      </button>
      <ul>
        {labelsList.map((labelDict, index) => (
          <li key={index} style={{ color: labelDict.color, cursor: "pointer" }}>
            <button
              style={{ backgroundColor: labelDict.color }}
              onClick={() => {
                handleSelectedLabel({ labelDict });
                closePopup();
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
