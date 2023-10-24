import React, { useState, useEffect } from "react";
import "./WindowPopUpLabels.css";

export default function WindowPopUpLabels({
  labelsList,
  closePopup,
  setSelectedLabelDict,
}) {
  const [tremble, setTremble] = useState(false);

  const handleSelectedLabel = ({ labelDict }) => {
    return setSelectedLabelDict(labelDict);
  };

  useEffect(() => {
    // Add event listeners for text selection when the popup is opened
    document.addEventListener("selectstart", disableTextSelection);
    document.addEventListener("contextmenu", disableContextMenu);

    return () => {
      // Remove event listeners for text selection when the popup is closed
      document.removeEventListener("selectstart", disableTextSelection);
      document.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  const disableTextSelection = (e) => {
    e.preventDefault();
    setTremble(true);
    return false;
  };

  const disableContextMenu = (e) => {
    e.preventDefault();
  };

  const closePopupAndEnableTextSelection = () => {
    closePopup();
  };

  return (
    <div className={`label-selection-popup ${tremble ? "trembling" : ""}`}>
      <button className="close-popup-button" onClick={closePopupAndEnableTextSelection}>
        X
      </button>
      <ul>
        {labelsList.map((labelDict, index) => (
          <li key={index} style={{ color: labelDict.color, cursor: "pointer" }}>
            <button
              style={{ backgroundColor: labelDict.color }}
              onClick={() => {
                handleSelectedLabel({ labelDict });
                closePopupAndEnableTextSelection(); // Enable text selection when a label is selected
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