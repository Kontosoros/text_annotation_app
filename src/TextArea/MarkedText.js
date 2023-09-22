const MarkedText = ({ text, markedSegments }) => {
    const renderTextWithMarks = () => {
      const elements = [];
      let currentPosition = 0;
  
      markedSegments.forEach((segment, index) => {
        const { start, end, styledText } = segment;
  
        // Add the unmarked text between the current position and the start of this segment
        if (start > currentPosition) {
          elements.push(text.substring(currentPosition, start));
        }
  
        // Add the marked text as a React component
        elements.push(
          <span key={index} dangerouslySetInnerHTML={{ __html: styledText }} />
        );
  
        // Update the current position
        currentPosition = end;
      });
  
      // Add any remaining unmarked text
      if (currentPosition < text.length) {
        elements.push(text.substring(currentPosition));
      }
  
      return elements;
    };
  
    return <div>{renderTextWithMarks()}</div>;
  };
  
  export default MarkedText;