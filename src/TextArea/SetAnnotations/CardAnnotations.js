import React from "react";
import "./CardAnnotations.css";
function CardAnnotations({ fileGoldenData }) {
  return (
    <div className="result-card">
      <div className="result-content">
        <div className="result-row header">
          <p className="result-column">START OFFSETS</p>
          <p className="result-column">END OFFSETS</p>
          <p className="result-column">TEXT</p>
          <p className="result-column">LABEL</p>
        </div>
        {fileGoldenData.map((item, index) => (
          <div key={index} className="result-row">
            <div className="result-column">
              <p>{item.start}</p>
            </div>
            <div className="result-column">
              <p>{item.end}</p>
            </div>
            <div className="result-column">
              <p>["{item.text}"]</p>
            </div>
            <div className="result-column">
              <p>{item.tag}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardAnnotations;
