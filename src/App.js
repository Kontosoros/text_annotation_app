import "./App.css";
import React, { useState, useEffect,useRef } from "react";
import LoadFiles from "./FilesHandler/LoadFiles";
import FileList from "./FilesHandler/FileList";
import SetLabels from "./Labels/SetLabels";
import PrepareLoadingData from "./TextArea/LoadingData/PrepareLoadingData";
const App = () => {
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "", content: "", entities: [] },
  ]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [labeList, setLabelList] = useState([]);
  const [goldenAnnotations, setGoldenAnnotations] = useState({});
  const isInitialRender = useRef(true);
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
  const { transformedList, loadingLabels } = PrepareLoadingData({
    uploadedFiles,
  });
  useEffect(() => {
    // Skip the effect on initial render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    console.log("mesaa")
      console.log("labelList", labeList);
      console.log("preparedLoadingData", transformedList);
    console.log("loadingLabels", loadingLabels);
    console.log("goldenAnnotations", goldenAnnotations);
  }, [labeList]); // Only log when labelList changes

  const mergeData = goldenAnnotations => {
    setGoldenAnnotations(goldenAnnotations);
    // console.log("labeList", labeList);
    // console.log("transformedList", transformedList);
    // console.log("goldenAnnotations",goldenAnnotations)
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
          mergeGoldenAndLoadedData={mergeData}
        />
      </div>
    </>
  );
};

export default App;
