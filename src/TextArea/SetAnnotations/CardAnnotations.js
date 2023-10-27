import React from "react";
import "./CardAnnotations.css";
function CardAnnotations({ fileGoldenData }) {
  console.log(fileGoldenData);
  return  (
    <div className="result-card">
      <div className="result-content">
        <div className="result-column">
          <p className="result-description">Start Offsets</p>
          {fileGoldenData.map((item, index) => (
            <p key={index}>{item.start}</p>
          ))}
        </div>
        <div className="result-column">
          <p className="result-info">End Offsets</p>
          {fileGoldenData.map((item, index) => (
            <p key={index}>{item.end}</p>
          ))}
        </div>
        <div className="result-column">
          <p className="result-date">Text</p>
          {fileGoldenData.map((item, index) => (
            <p key={index}>{item.text}</p>
          ))}
        </div>
        <div className="result-column">
          <p className="result-date">Label</p>
          {fileGoldenData.map((item, index) => (
            <p key={index}>{item.tag}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardAnnotations;
