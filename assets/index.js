/**
 * Set up Cesium
 */

window.CESIUM_BASE_URL = "/static/cesiumStatic";

import {
  Cartesian3,
  Color,
  createOsmBuildingsAsync,
  Ion,
  Math as CesiumMath,
  Terrain,
  Viewer,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

Ion.defaultAccessToken = process.env.CESIUM_ACCESS_TOKEN;

const DEFAULT_FLY_HEIGHT = 200000;
const MARKER_CYLINDER_READIUS = 10000;

const viewer = new Viewer("cesiumContainer", {
  terrain: Terrain.fromWorldTerrain(),
});

window.cesiumGotoPoint = (lng, lat, height) => {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(
      parseFloat(lng),
      parseFloat(lat),
      DEFAULT_FLY_HEIGHT
    ),
  });
};

window.clearPoints = () => {
  viewer.entities.removeAll();
};

window.markPoints = (points, scale, { title, datatype = "float" }) => {
  let maxValue = null;
  let minValue = null;
  const datatypeFuncs = {
    float: (value) => parseFloat(value),
  };

  points.forEach((point) => {
    if (!point["data"].hasOwnProperty(title)) {
      title = Object.keys(point["data"])[0];
    }

    const value = datatypeFuncs[datatype](point["data"][title]);

    if (maxValue === null || value >= maxValue) {
      maxValue = value;
    }

    if (minValue === null || value <= minValue) {
      minValue = value;
    }
  });

  points.map((point) => {
    if (!point["data"].hasOwnProperty(title)) {
      title = Object.keys(point["data"])[0];
    }

    const value = datatypeFuncs[datatype](point["data"][title]);
    let percent = 1;

    if (maxValue - minValue > 0) {
      percent = (value - minValue) / (maxValue - minValue);
    }

    viewer.entities.add({
      name: point.label,
      position: Cartesian3.fromDegrees(
        parseFloat(point.lng),
        parseFloat(point.lat),
        parseFloat(point.height)
      ),
      cylinder: {
        length: value * scale,
        topRadius: MARKER_CYLINDER_READIUS,
        bottomRadius: MARKER_CYLINDER_READIUS,
        material: new Color(percent, 0, 1 - percent),
        outline: false,
      },
    });
  });
};

/**
 * Set up React App
 */

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.js";

const root = createRoot(document.getElementById("reactApp"));

root.render(<App />);
