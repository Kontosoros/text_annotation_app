/*
Create a React component that allows users to 
upload multiple files. 
You can use the input element with the multiple attribute to enable multiple file selection
*/

const LoadFiles = ({ onFilesUpload }) => {
  const handleFileChange = e => {
    const selectedFiles = e.target.files;
    onFilesUpload(selectedFiles);
  };

  return (
    <div className="file-upload">
      <input type="file" multiple onChange={handleFileChange} />
    </div>
  );
};

export default LoadFiles;
