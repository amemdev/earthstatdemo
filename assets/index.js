/**
 * Set up Cesium
 */

window.CESIUM_BASE_URL = "/static/cesiumStatic";

import {
  Cartesian3,
  createOsmBuildingsAsync,
  Ion,
  Math as CesiumMath,
  Terrain,
  Viewer,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

Ion.defaultAccessToken = process.env.CESIUM_ACCESS_TOKEN;

const viewer = new Viewer("cesiumContainer", {
  terrain: Terrain.fromWorldTerrain(),
});

/**
 * Set up React App
 */

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.js";

const root = createRoot(document.getElementById("reactApp"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
