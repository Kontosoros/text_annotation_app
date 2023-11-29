import "./App.css";
import React, { useState } from "react";
import LoadFiles from "./FilesHandler/LoadFiles";
import FileList from "./FilesHandler/FileList";
import AddNewLabels from "./Labels/AddNewLabels";
import TextArea from "./TextArea/TextArea";
import "./TextArea/TextArea.css";
import ConvertLoadingDataFormat from "./Utils/ConvertLoadingDataFormat";
import UpdateDataColor from "./Utils/UpdateDataColor";
import SaveButton from "./Save/SaveButton";

const App = () => {
  const [uploadedFiles, setUploadedFiles] = useState([{}]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [labeList, setLabelList] = useState([]);
  const [goldenAnnotations, setGoldenAnnotations] = useState({});
  const [selectedFile, setSelectedFile] = useState("");
  const [hideLabelList, sethideLabelList] = useState([]);
  // Call the function to convert the format of the loaded data
  let { formattedData, loadingLabels } = ConvertLoadingDataFormat({
    uploadedFiles,
  });

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

  if (Object.keys(labeList).length) {
    formattedData = UpdateDataColor({
      labeList,
      formattedData,
      goldenAnnotations,
    });
  }

  const updateLoadingData = goldenAnnotations => {
    setGoldenAnnotations(goldenAnnotations);
  };
  const updateSelectedFile = file => {
    setSelectedFile(file);
  };
  const mergeExistingWithNewLabels = (newList, labelToRemove = "") => {
    setLabelList(prevLabelList => {
      // Extract label names from both existing and new labels
      const existingLabelNames = prevLabelList.map(label => label.labelName);
      const newLabelNames = newList.map(label => label.labelName);
      // Combine label names into a set to ensure uniqueness
      const mergedLabelNames = new Set([
        ...existingLabelNames,
        ...newLabelNames,
      ]);
      // Create an array of labels from the merged set
      const mergedList = Array.from(mergedLabelNames).map(labelName => {
        // Find the existing label with the same name
        const existingLabel = prevLabelList.find(
          label => label.labelName === labelName
        );
        // Find the new label with the same name
        const newLabel = newList.find(label => label.labelName === labelName);
        // If both existing and new labels exist, return a merged label with the color from the new label
        if (existingLabel && newLabel) {
          return { labelName, color: newLabel.color };
        }
        // If only the existing label exists, return it
        if (existingLabel) {
          return existingLabel;
        }
        // If only the new label exists, return it
        if (newLabel) {
          return newLabel;
        }
        // This case should not occur, but return a default label with an empty color
        return { labelName, color: "" };
      });
      // Filter out the label to remove
      const updatedList = mergedList.filter(
        label => label.labelName !== labelToRemove
      );
      return updatedList;
    });
  };
  const handleLabelsToHide = labelList => {
    sethideLabelList(labelList);
  };
  console.log("goldenAnnotations ", goldenAnnotations);
  console.log("uploadedFiles ", uploadedFiles);
  return (
    <>
      <div className="body">
        <AddNewLabels
          loadingLabels={loadingLabels}
          onUpdateLabelList={mergeExistingWithNewLabels}
          labelsToHide={handleLabelsToHide}
        />
        <LoadFiles onFilesUpload={handleFilesUpload} />
        <SaveButton goldenDataDict = {goldenAnnotations} uploadedFiles = {uploadedFiles}/>
        <FileList
          files={formattedData}
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
                hideLabelList={hideLabelList}
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
