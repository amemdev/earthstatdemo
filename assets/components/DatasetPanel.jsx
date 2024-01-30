import React from "react";

export default function DatasetPanel({
  datasets,
  selectedDatasetId = "",
  onDatasetChange = (datasetId) => {},
}) {
  return (
    <>
      <h4>Datasets</h4>
      <form className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={selectedDatasetId}
            onChange={(ev) => {
              onDatasetChange(ev.target.value);
            }}
          >
            <option>-</option>
            {datasets.map((dataset) => (
              <option key={dataset.id} value={dataset.id}>
                {dataset.title}
              </option>
            ))}
          </select>
        </div>
      </form>
    </>
  );
}
