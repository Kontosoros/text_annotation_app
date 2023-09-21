import React, { useState } from "react";
import TextArea from "../TextArea/TextArea";
import "./FileList.css";
const FileList = props => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileClick = file => {
    setSelectedFile(file);
  };
  console.log(props.labels)
  return (
    <div className="file-list">
      <div className="file-list-scroll">
        <ul>
          {props.files.map((file, index) => (
            <li className={`file-name ${
              props.selectedFiles.includes(file) ? "selected-file" : ""
            } ${selectedFile === file ? "clicked-file" : ""}`} key={index} onClick={() => handleFileClick(file)}>
              <input
                type="checkbox"
                checked={props.selectedFiles.includes(file)}
                onChange={() => props.onFileSelect(file)}
              />
              {file.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-area-container">
        {(selectedFile && (
          <div>
            <TextArea text={selectedFile.content} labelsList = {props.labels} />
          </div>
        )) || <TextArea />}
      </div>
      <button className = "button-remove" onClick={props.onRemoveFiles}>Remove Selected Files</button>
      
    </div>
  );
};

export default FileList;
