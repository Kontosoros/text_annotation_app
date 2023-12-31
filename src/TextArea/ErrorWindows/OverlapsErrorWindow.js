import "./OverlapsErrorWindow.css";

const OverlapsErrorWindow = ({ resetGoldenData }) => {
  const handleErrorClick = () => {
    resetGoldenData();
  };
  return (
    <div className="overlay">
      <div className="overlapping-error-window ">
        <p>
          Oops! It seems that there are too many overlapping entities. After
          pressing the button, the annotations for the selected message will be
          removed. Multiple overlaps are allowed only with the label "SEGMENTS_IN."
        </p>
        <button onClick={handleErrorClick}>OK</button>
      </div>
    </div>
  );
};

export default OverlapsErrorWindow;
