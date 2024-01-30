import React from "react";

export default function DatumTable({ data, onRowSelect }) {
  return (
    <>
      <h4>Data</h4>
      <table className="table table-sm table-striped table-hover">
        <thead>
          <tr>
            <th>Label</th>
            <th>Lat</th>
            <th>Lng</th>
            <th>Height</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              onClick={() => {
                onRowSelect(row.id);
              }}
            >
              <td>{row.label}</td>
              <td>{row.lat}</td>
              <td>{row.lng}</td>
              <td>{row.height}</td>
              <td>{JSON.stringify(row.data)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
