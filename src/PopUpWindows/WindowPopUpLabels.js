import React, { useState, useEffect } from "react";
import "./WindowPopUpLabels.css";

export default function WindowPopUpLabels({
  labelsList,
  closePopup,
  setSelectedLabelDict,
  cursorPosition,
}) {
  const [tremble, setTremble] = useState(false);

  const handleSelectedLabel = ({ labelDict }) => {
    return setSelectedLabelDict(labelDict);
  };

  useEffect(() => {
    document.addEventListener("selectstart", disableTextSelection);
    document.addEventListener("contextmenu", disableContextMenu);

    return () => {
      document.removeEventListener("selectstart", disableTextSelection);
      document.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  useEffect(() => {
    // Update the pop-up's position when the cursorPosition changes
    const popup = document.querySelector(".label-selection-popup");
    if (popup && cursorPosition) {
      const { x, y } = cursorPosition;
      popup.style.top = `${y}px`;
      popup.style.left = `${x}px`;
    }
  }, [cursorPosition]);

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
                closePopupAndEnableTextSelection();
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