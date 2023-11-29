import React from "react";
import SaveInDirectory from "./SaveInDirectory";
import "./SaveInDirectory.css";
import MergeAndConvertGoldenData from "./SaveUtils/MergeAndConvertGoldenData";

function SaveButton({ goldenDataDict, uploadedFiles }) {
  const adviceData = MergeAndConvertGoldenData({
    goldenDataDict,
    uploadedFiles,
  });

  return (
    <div className="save-button">
      <SaveInDirectory dataToSave={adviceData} />
    </div>
  );
}

export default SaveButton;
