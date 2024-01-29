import React from "react";
import { Ion } from "cesium";
import { Cartesian3, Color } from "cesium";
import { Viewer, Entity } from "resium";

Ion.defaultAccessToken = process.env.CESIUM_ACCESS_TOKEN;

export default function App() {
  return (
    <Viewer full>
      <Entity
        name="Tokyo"
        position={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
        point={{ pixelSize: 10, color: Color.WHITE }}
        description="hoge"
      />
    </Viewer>
  );
}
