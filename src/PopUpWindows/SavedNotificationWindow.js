import "./SavedNotificationWindow.css"

function SavedNotificationWindow({ message, onClose }) {
  return (
    <div className="notification-window">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default SavedNotificationWindow;
