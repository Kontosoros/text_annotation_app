import React, { useState, useEffect, useRef } from "react";
import "./AddLabels.css";
import ColorMap from "./ColorMap";
import "./LoadExistingLabels.css";

export default function AddNewLabels({ loadingLabels, onUpdateLabelList }) {
  const [label, setLabel] = useState("");
  const [newlabels, setLabelList] = useState([]); // State to store the list of labels
  const [selectedNewLabelIndex, setNewLabelIndex] = useState(null); // State to store the index of the selected label
  const [selectedLoadingLabelIndex, setLoadingLabelIndex] = useState(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const loadingLabelListRef = useRef([]); // Ref to store loadingLabelList
  const [runFirstTime, setTime] = useState(true);

  if (loadingLabels.length > 0 && runFirstTime === true) {
    loadingLabelListRef.current = loadingLabels;
    setTime(false);
  }

  const handleLabel = e => {
    setLabel(e.target.value);
  };

  const addLabel = () => {
    if (label.trim() !== "") {
      setLabelList([...newlabels, { labelName: label, color: "" }]);
      setLabel("");
    }
  };

  const handleSetNewLabelColor = color => {
    if (selectedNewLabelIndex !== null) {
      const updatedLabels = [...newlabels];
      updatedLabels[selectedNewLabelIndex].color = color;
      setLabelList(updatedLabels);
      setNewLabelIndex(null);
      setIsColorPickerOpen(false);
      onUpdateLabelList(updatedLabels);
    }
  };

  const handleSetLoadingLabelColor = color => {
    if (selectedLoadingLabelIndex !== null) {
      const updatedLoadingLabels = [...loadingLabelListRef.current];
      updatedLoadingLabels[selectedLoadingLabelIndex].color = color;
      onUpdateLabelList(updatedLoadingLabels);
      setLoadingLabelIndex(null);
      setIsColorPickerOpen(false);
    }
  };

  const handleRemoveNewLabel = index => {
    const updatedLabels = [...newlabels];
    const labelToRemove = updatedLabels[index].labelName
    // Remove the label from the list
    updatedLabels.splice(index, 1);
    // Call the function to update labelList in the App component
    onUpdateLabelList(updatedLabels , labelToRemove);
    // Update the labelList state with the modified array
    setLabelList(updatedLabels);
  };

  const handleRemoveLoadingLabel = index => {
    const updatedLoadingLabelList = [...loadingLabelListRef.current];
    updatedLoadingLabelList.splice(index, 1);
    loadingLabelListRef.current = updatedLoadingLabelList;
    onUpdateLabelList(updatedLoadingLabelList);
  };

  const handleNewLabelChange = index => {
    setNewLabelIndex(index);
    setIsColorPickerOpen(true);
  };

  const handleLoadingLabelChange = index => {
    setLoadingLabelIndex(index);
    setIsColorPickerOpen(true);
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
          {newlabels.map((item, index) => (
            <li key={index}>
              <button
                className="label-button"
                style={{ backgroundColor: item.color, color: "white" }}
                onClick={() => handleNewLabelChange(index)}
              >
                {item.labelName}
              </button>
              <button
                className="button-cancel"
                style={{ color: "white" }}
                onClick={() => handleRemoveNewLabel(index)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        {selectedNewLabelIndex !== null && isColorPickerOpen && (
          <ColorMap
            onColorSelected={handleSetNewLabelColor}
            initialColor={newlabels[selectedNewLabelIndex]?.color || ""}
          />
        )}
      </div>
      <div className="add-label-button">
        <button onClick={addLabel}>Add Labels</button>
      </div>

      <div className="loading-container">
        <ul className=".loading-list">
          {loadingLabelListRef.current.map((item, index) => (
            <li key={index}>
              <button
                className=".loading-button"
                style={{ backgroundColor: item.color, color: "white" }}
                onClick={() => handleLoadingLabelChange(index)}
              >
                {item.labelName}
              </button>
            </li>
          ))}
        </ul>
        {selectedLoadingLabelIndex !== null && isColorPickerOpen && (
          <ColorMap
            onColorSelected={handleSetLoadingLabelColor}
            initialColor={
              loadingLabelListRef.current[selectedLoadingLabelIndex]?.color ||
              ""
            }
          />
        )}
      </div>
    </div>
  );
}
