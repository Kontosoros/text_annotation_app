import React, { useState } from "react";
import SavedNotificationWindow from "../PopUpWindows/SavedNotificationWindow";

function SaveInDirectory({dataToSave}) {
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handleSaveClick = async () => {
    
    try {
      // Open a directory picker dialog
      const directoryHandle = await window.showDirectoryPicker();
      // Create a new file inside the selected directory
      const fileHandle = await directoryHandle.getFileHandle(
        "saved_data.json",
        { create: true }
      );
      // Create a writable stream to write data to the file
      const writable = await fileHandle.createWritable();
      // Write the JSON data to the file
      await writable.write(JSON.stringify(dataToSave, null, 2));
      if (writable) {
        setMessage("Data saved successfully...!!!");
      }
      setShowNotification(true);
      // Close the writable stream
      await writable.close();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  const closeNotification = () => {
    setShowNotification(false);
  };
  return (
    <div>
      <button onClick={handleSaveClick}>Save</button>
      {showNotification && (<SavedNotificationWindow message = {message} onClose={closeNotification}/>)}
    </div>
  );
}

export default SaveInDirectory;
