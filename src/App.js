import "./App.css";

import React, { useState, useEffect, useRef } from "react";
import LoadFiles from "./FilesHandler/LoadFiles";
import FileList from "./FilesHandler/FileList";
import SetLabels from "./Labels/SetLabels";
import TextArea from "./TextArea/TextArea";
import  "./TextArea/TextArea.css";
import PrepareLoadingData from "./TextArea/LoadingData/PrepareLoadingData";
import SendData from "./TextArea/LoadingData/SendData";
const App = () => {
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "", content: "", entities: [] },
  ]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [labeList, setLabelList] = useState([]);
  const [goldenAnnotations, setGoldenAnnotations] = useState({});
  const [selectedFile, setSelectedFile] = useState("");
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

  // Call PrepareLoadingData and store the result in loadingData
  let { transformedList, loadingLabels } = PrepareLoadingData({
    uploadedFiles,
  });

  if (Object.keys(goldenAnnotations).length && Object.keys(labeList).length) {
    transformedList = SendData({
      labeList,
      transformedList,
      goldenAnnotations,
    });
    console.log("updatedTransformedList", transformedList);
    console.log("goldenAnnotations", goldenAnnotations);
  }

  const updateLoadingData = goldenAnnotations => {
    setGoldenAnnotations(goldenAnnotations);
  };
  const updateSelectedFile = file => {
    setSelectedFile(file);
  };
  return (
    <>
      <div className="app">
        <SetLabels
          onUpdateLabelList={updateLabelList}
          loadingEntityLabels={loadingLabels}
        />
        <LoadFiles onFilesUpload={handleFilesUpload} />
        <FileList
          files={transformedList}
          selectedFiles={selectedFiles}
          onFileSelect={handleFileSelect}
          onRemoveFiles={handleCloseSelectedFiles}
          labels={labeList}
          selectedFile={updateSelectedFile}
        />
        <div className="text-area-container">
          {selectedFile && (
            <div>
              <TextArea
                filename={selectedFile.name}
                text={selectedFile.content}
                labelsList={labeList}
                entities={selectedFile.entities}
                updateLoadingData={updateLoadingData}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
