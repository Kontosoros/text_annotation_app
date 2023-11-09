import React, { useState } from "react";
import TextArea from "../TextArea/TextArea";
import "./FileList.css";
const FileList = props => {
  const [selectedFile, setSelectedFile] = useState({
    name: "",
    content: "",
    entities: [],
  });
  
  const handleFileClick = file => {
    setSelectedFile(file);
  };
  
  return (
    <div className="file-list">
      <div className="file-list-scroll">
        <ul>
          {props.files.map((file, index) => (
            <li
              className={`file-name ${
                props.selectedFiles.includes(file) ? "selected-file" : ""
              } ${selectedFile === file ? "clicked-file" : ""}`}
              key={index}
              onClick={() => handleFileClick(file)}
            >
              <button
                checked={props.selectedFiles.includes(file)}
                onChange={() => props.onFileSelect(file)}
              >
                {file.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-area-container">
        {selectedFile && (
          <div>
            <TextArea
              filename={selectedFile.name}
              text={selectedFile.content}
              labelsList={props.labels}
              entities={selectedFile.entities}
            />
          </div>
        )}
      </div>
      <button className="button-remove" onClick={props.onRemoveFiles}>
      <label className="label-button-remove">
      Close Files
      </label>
      </button>
    </div>
  );
};

export default FileList;
