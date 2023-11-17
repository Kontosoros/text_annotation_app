import React, { useState } from "react";
import "./AddLabels.css";
import ColorMap from "./ColorMap";

export default function AddNewLabels({ onUpdateLabelList }) {
  const [label, setLabel] = useState("");
  const [labelList, setLabelList] = useState([]); // State to store the list of labels
  const [selectedLabelIndex, setSelectedLabelIndex] = useState(null); // State to store the index of the selected label
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const handleLabel = e => {
    setLabel(e.target.value);
  };
  const addLabel = () => {
    if (label.trim() !== "") {
      setLabelList([...labelList, { labelName: label, color: "" }]); // Add the label to the list
      setLabel(""); // Clear the input field
    }
  };

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
      onUpdateLabelList(updatedLabels);
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
      <div className="add-label-container">
        <input
          className="add-label-placeholder"
          onChange={handleLabel}
          value={label}
          type="text"
          placeholder="Labels..."
        ></input>
        <ul className="label-list">
          {labelList.map((item, index) => (
            <li key={index}>
              <button
                className="label-button"
                style={{ backgroundColor: item.color, color: "white" }}
                onClick={() => handleLabelCheckboxChange(index)}
              >
                {item.labelName}
              </button>
              <button
                className="button-cancel"
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
      <div className="add-label-button">
        <button onClick={addLabel}>Add Labels</button>
      </div>
    </div>
  );
}
