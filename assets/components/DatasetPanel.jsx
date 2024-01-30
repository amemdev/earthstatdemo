import React from "react";

export default function DatasetPanel({
  datasets,
  selectedDatasetId = "",
  selectedFieldId = "",
  onDatasetChange = (datasetId) => {},
  onFieldChange = (field) => {},
}) {
  const selectedDataset = datasets.find(
    (dataset) => dataset.id == selectedDatasetId
  );

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
            <option value="">-</option>
            {datasets.map((dataset) => (
              <option key={dataset.id} value={dataset.id}>
                {dataset.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select field to visualise:</label>
          <select
            className="form-control"
            value={selectedFieldId}
            onChange={(ev) => {
              const selectedField = selectedDataset.fields.find(
                (field) => field.id == ev.target.value
              );

              if (selectedField) {
                onFieldChange(selectedField);
              }
            }}
          >
            <option value="">-</option>
            {selectedDataset &&
              selectedDataset.fields.map((field) => (
                <option key={field.id} value={field.id}>
                  {field.title}
                </option>
              ))}
          </select>
        </div>
      </form>
    </>
  );
}
