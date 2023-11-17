import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import LoadFiles from "./FilesHandler/LoadFiles";
import FileList from "./FilesHandler/FileList";
import AddNewLabels from "./Labels/AddNewLabels";
import LoadExistingLabels from "./Labels/LoadExistingLabels";
import TextArea from "./TextArea/TextArea";
import "./TextArea/TextArea.css";
import ConvertLoadingDataFormat from "./LoadingDataUtils/ConvertLoadingDataFormat";
import UpdateDataColor from "./LoadingDataUtils/UpdateDataColor";

const App = () => {
  const [uploadedFiles, setUploadedFiles] = useState([{ name: "", content: "", entities: [] }]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [labeList, setLabelList] = useState([]);
  const [goldenAnnotations, setGoldenAnnotations] = useState({});
  const [selectedFile, setSelectedFile] = useState("");

  const handleFilesUpload = files => {
    setUploadedFiles(files);
  };

  const handleCloseSelectedFiles = () => {
    const updatedFiles = uploadedFiles.filter(
      fileName => !selectedFiles.includes(fileName)
    );
    setUploadedFiles(updatedFiles);
    setSelectedFiles([]);
  };

  // Call PrepareLoadingData and store the result in loadingData
  let { transformedList, loadingLabels } = ConvertLoadingDataFormat({
    uploadedFiles,
  });

  if (Object.keys(goldenAnnotations).length && Object.keys(labeList).length) {
    transformedList = UpdateDataColor({
      labeList,
      transformedList,
      goldenAnnotations,
    });
  }

  const updateLoadingData = goldenAnnotations => {
    setGoldenAnnotations(goldenAnnotations);
  };
  const updateSelectedFile = file => {
    setSelectedFile(file);
  };
  const updateLabelList = newList => {
    /* the function first updates the color of existing labels and then filters out the labels that are already present in prevLabelList 
    from newList. Finally, it combines the updated prevLabelList with the new labels, resulting in an updated labelList without duplicates.*/
    setLabelList(prevLabelList => {
      const updatedLabelList = prevLabelList.map(prevLabelDict => {
        const matchingNewLabel = newList.find(
          newLabelDict => newLabelDict.labelName === prevLabelDict.labelName
        );
        return matchingNewLabel
          ? { ...prevLabelDict, color: matchingNewLabel.color }
          : prevLabelDict;
      });
      // Filter out labels that are not in the newList
      const newLabels = newList.filter(
        newLabelDict =>
          !prevLabelList.some(
            prevLabel => prevLabel.labelName === newLabelDict.labelName
          )
      );
      // Combine the updatedLabelList with the newLabels
      return [...updatedLabelList, ...newLabels];
    });
  };

  return (
    <>
      <div className="body">
        <AddNewLabels onUpdateLabelList={updateLabelList} />
        <LoadExistingLabels
          newloadingL={loadingLabels}
          loadingEntityLabels={updateLabelList}
        />
        <LoadFiles onFilesUpload={handleFilesUpload} />
        <FileList
          files={transformedList}
          selectedFiles={selectedFiles}
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
