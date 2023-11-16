import React, { useState, useEffect } from "react";
import "./LoadExistingLabels.css";
import ColorMap from "./ColorMap";

export default function LoadExistingLabels(props) {
  const [labelList, setLabelList] = useState([]); // State to store the list of labels
  const [selectedLabelIndex, setSelectedLabelIndex] = useState(null); // State to store the index of the selected label
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);
  useEffect(() => {
    if (props.newloadingL && props.newloadingL.length > 0 && !hasRendered) {
      setLabelList(props.newloadingL);
      setHasRendered(true);
    }
  }, [props.newloadingL, hasRendered]);

  const handleLabelCheckboxChange = index => {
    setSelectedLabelIndex(index);
    setIsColorPickerOpen(true);
  };
  const handleSetLabelColor = color => {
    if (selectedLabelIndex !== null) {
      const updatedLabels = [...labelList];
      updatedLabels[selectedLabelIndex].color = color;

      setLabelList(updatedLabels);
      setSelectedLabelIndex(null); // Reset the selected label index
      setIsColorPickerOpen(false);
      // Call the function to update labelList in the App component
      props.loadingEntityLabels(updatedLabels);
    }
  };
  const handleRemoveLabel = index => {
    const updatedLabelList = [...labelList];
    // Use splice to remove the item at the specified index
    updatedLabelList.splice(index, 1);
    // Update the labelList state with the modified array
    setLabelList(updatedLabelList);
  };

  return (
    <div>
      <div className="loading-container">
        <ul className=".loading-container .loading-list">
          {labelList.map((item, index) => (
            <li key={index}>
              <button
                className=".loading-container .loading-button"
                style={{ backgroundColor: item.color, color: "white" }}
                onClick={() => handleLabelCheckboxChange(index)}
              >
                {item.labelName}
              </button>
              <button
                className="remove-button"
                style={{ color: "white" }}
                onClick={() => handleRemoveLabel(index)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        {selectedLabelIndex !== null && isColorPickerOpen && (
          <ColorMap
            onColorSelected={handleSetLabelColor}
            initialColor={labelList[selectedLabelIndex].color}
          />
        )}
      </div>
    </div>
  );
}
