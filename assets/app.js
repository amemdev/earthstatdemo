import React, { useEffect, useState } from "react";
import DatasetPanel from "./components/DatasetPanel.jsx";
import DatumTable from "./components/DatumTable.jsx";

export default function App() {
  const [datasets, setDatasets] = useState([]);
  const [selectedDatasetId, setSelectedDatasetId] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [selectedField, setSelectedField] = useState({ id: "" });
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
        selectedFieldId={selectedField.id}
        onFieldChange={(field) => {
          setSelectedField(field);
          clearPoints();
          markPoints(currentData, 1000, field);
        }}
        onDatasetChange={(datasetId) => {
          if (datasetId) {
            loadData(datasetId).then((data) => {
              setCurrentData(data);
              setSelectedDatasetId(datasetId);
            });
          } else {
            setCurrentData([]);
            setSelectedDatasetId("");
          }
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
