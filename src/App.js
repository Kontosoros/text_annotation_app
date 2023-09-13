import "./App.css";
import React, { useState } from "react";
import LoadFiles from "./FilesHandler/LoadFiles";
import FileList from "./FilesHandler/FileList";

const App = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFilesUpload = files => {
    const fileDataPromises = Array.from(files).map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => {
          resolve({ name: file.name, content: event.target.result });
        };
        reader.readAsText(file);
      });
    });

    Promise.all(fileDataPromises)
      .then(fileData => {
        setUploadedFiles(fileData);
      })
      .catch(error => console.error(error));
  };
  const handleFileSelect = (fileId) => {
    if (selectedFiles.includes(fileId)) {
      setSelectedFiles(selectedFiles.filter((id) => id !== fileId));
    } else {
      setSelectedFiles([...selectedFiles, fileId]);
    }
  };
  const handleCloseSelectedFiles = () => {
    const updatedFiles = uploadedFiles.filter(
      (fileName) => !selectedFiles.includes(fileName)
    );
    setUploadedFiles(updatedFiles);
    setSelectedFiles([]);
  };
  return (
    <div className="app">
      <LoadFiles onFilesUpload={handleFilesUpload} />
      <FileList files={uploadedFiles} 
        selectedFiles={selectedFiles}
        onFileSelect={handleFileSelect}
        onRemoveFiles={handleCloseSelectedFiles}/>
        
    </div>
  );
};

export default App;
