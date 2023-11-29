import { React } from "react";
import CardAnnotations from "./CardAnnotations";

const AnnotationsDisplayArea = ({ filename, goldenData }) => {
  const fileGoldenData = Array.isArray(goldenData[filename])
    ? goldenData[filename]
    : Array.isArray(goldenData)
    ? goldenData
    : [];

  return (
    <div>
      {fileGoldenData && <CardAnnotations fileGoldenData={fileGoldenData} />}
    </div>
  );
};
export default AnnotationsDisplayArea;
