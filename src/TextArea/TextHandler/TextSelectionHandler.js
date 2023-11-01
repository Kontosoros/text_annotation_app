import React from "react";
import { TextAnnotateBlend } from "react-text-annotate-blend";

const TextSelectionHandler = ({ msgBody, value,  updateValue }) => {
  const handleChange = (values) => {
    console.log("updated :",values)
    updateValue(values);
  };

  
  console.log("value :",value)
  return (
    <div>
      <TextAnnotateBlend
        style={{
          fontSize: "1.2rem",
        }}
        content={msgBody}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

// // Deduplicate dictionaries based on 'start' and 'end' properties
// const deduplicateDictionaries = (dictionaries) => {
//   const uniqueDicts = [];
//   const seenDicts = new Set();

//   for (const dict of dictionaries) {
//     const key = `${dict.start}-${dict.end}`;
//     if (!seenDicts.has(key)) {
//       seenDicts.add(key);
//       uniqueDicts.push(dict);
//     }
//   }

//   return uniqueDicts;
// };

export default TextSelectionHandler;