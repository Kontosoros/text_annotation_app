import React, { useState } from "react";
import "./AddLabels.css";
import ColorLabels from "./ColorLabels";
export default function AddLabels() {
  const [label, setLabel] = useState("");
  const [labelList, setLabelList] = useState([]); // State to store the list of labels
  const [selectedColor, setSelectedColor] = useState("#000"); // State to store the selected color
  const [selectedLabelIndex, setSelectedLabelIndex] = useState(null); // State to store the index of the selected label
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const handleLabel = e => {
    setLabel(e.target.value);
  };
  const addLabel = () => {
    if (label.trim() !== "") {
      setLabelList([...labelList, { text: label, color: selectedColor }]); // Add the label to the list
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
    }
  };
  
  return (
    <div className="add-label">
      <input
        onChange={handleLabel}
        value={label}
        type="text"
        placeholder="Label"
      ></input>
      <button onClick={addLabel}>Add Label</button>
      <ul>
        {labelList.map((item, index) => (
          <li key={index} style={{ color: item.color }}>
            <input
              type="checkbox"
              checked={item.checked || false}
              onClick={() => handleLabelCheckboxChange(index)}
            />

            {item.text}
          </li>
        ))}
      </ul>
      {selectedLabelIndex !== null && isColorPickerOpen && (
        <ColorLabels
          onColorSelected={handleSetLabelColor}
          initialColor={labelList[selectedLabelIndex].color}
        />
      )}
      
    </div>
  );
}
