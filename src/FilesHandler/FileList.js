import React, { useState, useEffect } from "react";

import "./FileList.css";
const FileList = props => {
  const [selectedFile, setSelectedFile] = useState({});
  const [msgcounter, setMsgCounter] = useState(0);

  const handleFileClick = (file, index) => {
    setMsgCounter(index + 1);
    setSelectedFile(file);
  };

  useEffect(() => {
    props.selectedFile(selectedFile);
  }, [selectedFile, props]);

  // Check if there are files before rendering the list
  if (!props.files) {
    return null;
  }
  return (
    <div className="file-list-container">
      <div className="file-list">
        <div className="file-list-scroll">
          <ul>
            {props.files.map((file, index) => (
              <li key={index} onClick={() => handleFileClick(file, index)}>
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
      {msgcounter && (
        <div className="msg-counter">
          File {msgcounter} out of {props.files.length}
        </div>
      )}
    </div>
  );
};

export default FileList;
