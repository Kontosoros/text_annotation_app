import "./App.css";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
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
  const transformedListRef = useRef([{ name: "", content: "", entities: [] }]);
  const [loadingLabels, setLoadingLabels] = useState([]);
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

  useEffect(() => {
    // Call PrepareLoadingData and store the result in loadingData
    const { transformedList, loadingLabels } = PrepareLoadingData({
      uploadedFiles,
    });
    transformedListRef.current = transformedList;
    setLoadingLabels(loadingLabels);
  }, [labeList]);

  useEffect(() => {
    // Skip the effect on initial render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    axios
      .post("http://127.0.0.1:5001/receive-data", {
        labeList,
        transformedList: transformedListRef.current,
        goldenAnnotations,
      })
      .then(response => {
        const updatedLoadingData = console.log(
          "Data sent successfully!",
          response.data
        );
      })
      .catch(error => {
        console.error("Error sending data:", error);
      });
  }, [labeList, goldenAnnotations]);

  const mergeData = goldenAnnotations => {
    setGoldenAnnotations(goldenAnnotations);
  };
  console.log("transformedListRef", transformedListRef.current);
  return (
    <>
      <div className="app">
        <SetLabels
          onUpdateLabelList={updateLabelList}
          loadingEntityLabels={loadingLabels}
        />
        <LoadFiles onFilesUpload={handleFilesUpload} />
        <FileList
          files={transformedListRef.current}
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
