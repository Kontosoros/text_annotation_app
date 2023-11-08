import "./App.css";
import React, { useState } from "react";
import LoadFiles from "./FilesHandler/LoadFiles";
import FileList from "./FilesHandler/FileList";
import SetLabels from "./Labels/SetLabels";
const App = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [labeList, setLabelList] = useState([]);

  const updateLabelList = newList => {
    setLabelList(newList);
  };

  const handleFilesUpload = files => {
    const fileDataPromises = Array.from(files).map(file => {
      return {
        name: file.document_id,
        content: file.text,
        entities: file.entities,
      };
    });

    Promise.all(fileDataPromises)
      .then(fileData => {
        setUploadedFiles(fileData);
      })
      .catch(error => console.error(error));
  };
  const handleFileSelect = fileId => {
    if (selectedFiles.includes(fileId)) {
      setSelectedFiles(selectedFiles.filter(id => id !== fileId));
    } else {
      setSelectedFiles([...selectedFiles, fileId]);
    }
  };
  const handleCloseSelectedFiles = () => {
    const updatedFiles = uploadedFiles.filter(
      fileName => !selectedFiles.includes(fileName)
    );
    setUploadedFiles(updatedFiles);
    setSelectedFiles([]);
  };
  
  return (
    <>
      <div className="app">
        <SetLabels onUpdateLabelList={updateLabelList} />
        <LoadFiles onFilesUpload={handleFilesUpload} />
        <FileList
          files={uploadedFiles}
          selectedFiles={selectedFiles}
          onFileSelect={handleFileSelect}
          onRemoveFiles={handleCloseSelectedFiles}
          labels={labeList}
        />
      </div>
    </>
  );
};

export default App;
