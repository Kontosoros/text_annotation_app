import React, { useState } from "react";
import { ChromePicker } from "react-color";
import "./ColorMap.css";
export default function ColorMap({ onColorSelected }) {
  const [color, setColor] = useState("#000"); // State to store the selected color

  const handleColorChange = newColor => {
    setColor(newColor.hex);
  };

  const handleConfirmColor = () => {
    // Pass the selected color to the parent component when you're ready
    onColorSelected(color);
    // Hide the ChromePicker
  };

  return (
    <div>
      <div className="color-picker-map">
        <ChromePicker color={color} onChangeComplete={handleColorChange} />
        <div className="color-picker-buttons">
          <button onClick={handleConfirmColor}>Select Color</button>
        </div>
      </div>
    </div>
  );
}
