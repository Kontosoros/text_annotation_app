/*
Create a React component that allows users to 
upload multiple files. 
You can use the input element with the multiple attribute to enable multiple file selection
*/

const LoadFiles = ({ onFilesUpload }) => {
  const handleFileChange = e => {
    const selectedFiles = e.target.files;
    // Convert the FileList to an array for easier iteration
    const filesArray = Array.from(selectedFiles);
    const jsonDataArray = [];
    const readAndParseFile = file => {
      const reader = new FileReader();
      reader.onload = event => {
        const fileContent = event.target.result;
        try {
          const jsonData = JSON.parse(fileContent);
          // Extract the desired key text from the JSON data
          const keyText = jsonData.text; // Replace 'key' with the actual key name
          const entities = jsonData.entities;
          jsonDataArray.push({
            document_id: file.name,
            text: keyText,
            entities: entities,
          });
        } catch (error) {
          console.error("Error parsing JSON:");
        }

        // Check if all files have been processed
        if (jsonDataArray.length === filesArray.length) {
          onFilesUpload(jsonDataArray);
        }
      };
      // Read the file as text
      reader.readAsText(file);
    };
    // Read and parse each selected file
    filesArray.forEach(readAndParseFile);
  };

  return (
    <div className="file-upload">
      <input type="file" multiple onChange={handleFileChange} />
    </div>
  );
};

export default LoadFiles;
