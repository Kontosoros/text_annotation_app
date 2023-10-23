import React from "react";

function Selector({ value, handler }) {
  
  return (
    <div>
      <label>Select a Tag: </label>
      <select value={value} onChange={handler}>
        <option value="tagA">Tag A</option>
        <option value="tagB">Tag B</option>
        <option value="tagC">Tag C</option>
      </select>
    </div>
  );
}

export default Selector;