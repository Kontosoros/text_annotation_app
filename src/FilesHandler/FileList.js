import React, { useState } from "react";
import TextArea from "../DisplayArea/TextArea";
import "./FileList.css";
const FileList = ({ files, selectedFiles, onFileSelect, onRemoveFiles }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileClick = file => {
    setSelectedFile(file);
  };

  return (
    <div className="file-list">
      <div className="file-list-scroll">
        <ul>
          {files.map((file, index) => (
            <li className={`file-name ${
              selectedFiles.includes(file) ? "selected-file" : ""
            } ${selectedFile === file ? "clicked-file" : ""}`} key={index} onClick={() => handleFileClick(file)}>
              <input
                type="checkbox"
                checked={selectedFiles.includes(file)}
                onChange={() => onFileSelect(file)}
              />
              {file.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-area-container">
        {(selectedFile && (
          <div>
            <TextArea text={selectedFile.content} />
          </div>
        )) || <TextArea />}
      </div>
      <button className = "button-remove" onClick={onRemoveFiles}>Remove Selected Files</button>
    </div>
  );
};

export default FileList;
