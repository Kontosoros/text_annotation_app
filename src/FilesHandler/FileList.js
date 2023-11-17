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

  // Check if there are files before rendering the list
  if (props.files.length === 0) {
    return null;
  }
  return (
    <div className="file-list-container">
      <div className="file-list">
        <div className="file-list-scroll">
          <ul>
            {props.files.map((file, index) => (
              <li key={index} onClick={() => handleFileClick(file)}>
                <button
                  className={`file-button ${
                    selectedFile.name === file.name ? "clicked-button" : ""
                  }`}
                  
                  onClick={() => handleFileClick(file)}
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
