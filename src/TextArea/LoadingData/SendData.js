import React, { useEffect } from "react";
import axios from "axios";
function SendData({ labeList, transformedList, goldenAnnotations }) {
  useEffect(() => {
    axios
      .post("http://127.0.0.1:5001/receive-data", {
        labeList,
        transformedList,
        goldenAnnotations,
      })
      .then(response => {
        const updatedLoadingData = response.data;
        return updatedLoadingData;
      })
      .catch(error => {
        console.error("Error sending data:", error);
      });
  }, [labeList, goldenAnnotations]);
}

export default SendData;
