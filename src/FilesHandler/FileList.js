import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    props.selectedFile(selectedFile);
  }, [selectedFile, props]);
  return (
    <div className="file-list-container">
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
      </div>
    </div>
  );
};

export default FileList;
