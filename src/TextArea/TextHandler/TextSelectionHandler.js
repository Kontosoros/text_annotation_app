import React from "react";

const TextSelectionHandler = ({
  msgBody,
  contentEditableRef,
  handleTextSelection,
}) => {
  return (
    <div
      className="large-textarea"
      ref={contentEditableRef}
      contentEditable="true"
      onMouseUp={handleTextSelection} // Use onMouseUp to handle text selection
      dangerouslySetInnerHTML={{ __html: msgBody }}
    />
  );
};

export default TextSelectionHandler;
