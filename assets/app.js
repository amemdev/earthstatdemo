import React, { useEffect, useState } from "react";
import DatasetPanel from "./components/DatasetPanel.jsx";
import DatumTable from "./components/DatumTable.jsx";

export default function App() {
  const [datasets, setDatasets] = useState([]);
  const [selectedDatasetId, setSelectedDatasetId] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [selectedField, setSelectedField] = useState({ id: "" });
  const [selectedDate, setSelectedDate] = useState("2000-01-01");

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
  const loadData = (datasetId, selectedDate) => {
    const url = `/api/geodatums/?dataset=${datasetId}&date=${selectedDate}`;

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
        }}
        onDatasetChange={(datasetId) => {
          if (datasetId) {
            loadData(datasetId, selectedDate).then((data) => {
              setCurrentData(data);
              setSelectedDatasetId(datasetId);
            });
          } else {
            setCurrentData([]);
            setSelectedDatasetId("");
          }
        }}
      />
      <div>
        <label>Select date:</label>
        <br />
        (Set to the 1st of the month)
        <input
          type="date"
          className="form-control"
          value={selectedDate}
          onChange={(ev) => {
            setSelectedDate(ev.target.value);

            loadData(selectedDatasetId, ev.target.value).then((data) => {
              setCurrentData(data);
            });
          }}
        ></input>
      </div>

      <br />

      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            clearPoints();
            markPoints(currentData, 1000, selectedField);
          }}
        >
          Render Points
        </button>
      </div>

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
