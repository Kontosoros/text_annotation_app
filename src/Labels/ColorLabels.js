import React, { useState } from "react";
import { ChromePicker } from "react-color";

export default function ColorLabels({ onColorSelected }) {
  const [color, setColor] = useState("#000"); // State to store the selected color
  const [showColorPicker, setShowColorPicker] = useState(false); // Initially hide the ChromePicker

  const handleColorChange = newColor => {
    setColor(newColor.hex);
  };

  const handleSelectColor = () => {
    // Show the ChromePicker when the "Select Color" button is clicked
    setShowColorPicker(true);
  };

  const handleConfirmColor = () => {
    // Pass the selected color to the parent component when you're ready
    onColorSelected(color);
    // Hide the ChromePicker
    setShowColorPicker(false);
  };

  const handleCancelColor = () => {
    // Hide the ChromePicker without changing the selected color
    setShowColorPicker(false);
  };

  return (
    <div>
      <div>
        <div>
          <button onClick={handleSelectColor}>Select Color</button>
        </div>
        <div>
          {/* Render a color bar or palette here */}
          {/* This is where you can select a color before refining it */}
        </div>
      </div>
      {showColorPicker && (
        <div>
          <ChromePicker color={color} onChangeComplete={handleColorChange} />
          <button onClick={handleConfirmColor}>Confirm</button>
          <button onClick={handleCancelColor}>Cancel</button>
        </div>
      )}
    </div>
  );
}

