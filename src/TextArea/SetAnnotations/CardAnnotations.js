import React from "react";
import "./CardAnnotations.css";
function CardAnnotations({ fileGoldenData }) {
  console.log(fileGoldenData);
  return (
    <div className="result-card">
      <div className="result-content">
        <div className="result-row header">
          <p className="result-column">Start Offsets</p>
          <p className="result-column">End Offsets</p>
          <p className="result-column">Text</p>
          <p className="result-column">Label</p>
        </div>
        {fileGoldenData.map((item, index) => (
          <button key={index} className="result-row">
            <div className="result-column">
              <p>{item.start}</p>
            </div>
            <div className="result-column">
              <p>{item.end}</p>
            </div>
            <div className="result-column">
              <p>{item.text}</p>
            </div>
            <div className="result-column">
              <p>{item.tag}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CardAnnotations;
