import React, { useEffect, useState } from "react";
import DatasetPanel from "./components/DatasetPanel.jsx";
import DatumTable from "./components/DatumTable.jsx";

export default function App() {
  const [datasets, setDatasets] = useState([]);
  const [selectedDatasetId, setSelectedDatasetId] = useState("");
  const [currentData, setCurrentData] = useState([]);

  /**
   * Load init data
   */
  const loadDatasets = () => {
    const url = "/api/datasets/";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDatasets(data);
      });
  };
  useEffect(loadDatasets, []);

  /**
   * Load data points
   */
  const loadData = (datasetId) => {
    const url = `/api/geodatums/?dataset=${datasetId}`;

    return fetch(url).then((response) => response.json());
  };

  return (
    <>
      <DatasetPanel
        datasets={datasets}
        selectedDatasetId={selectedDatasetId}
        onDatasetChange={(datasetId) => {
          loadData(datasetId).then((data) => {
            setCurrentData(data);
            clearPoints();
            markPoints(data, 1000);
            setSelectedDatasetId(datasetId);
          });
        }}
      />
      <DatumTable
        data={currentData}
        onRowSelect={(id) => {
          const datum = currentData.find((datum) => datum.id == id);
          window.cesiumGotoPoint(
            parseFloat(datum.lng),
            parseFloat(datum.lat),
            parseFloat(datum.height)
          );
        }}
      ></DatumTable>
    </>
  );
}
