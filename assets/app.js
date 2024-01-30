import React, { useEffect, useState } from "react";
import DatasetPanel from "./components/DatasetPanel.jsx";

export default function App() {
  const [datasets, setDatasets] = useState([]);
  const [selectedDatasetId, setSelectedDatasetId] = useState("");

  /**
   * Load init data
   */
  const loadData = () => {
    const url = "/api/datasets/";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDatasets(data);
      });
  };

  useEffect(loadData, []);

  return (
    <DatasetPanel
      datasets={datasets}
      selectedDatasetId={selectedDatasetId}
      onDatasetChange={setSelectedDatasetId}
    />
  );
}
