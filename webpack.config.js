const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const cesiumSource = "node_modules/cesium/Build/Cesium";
const cesiumBaseUrl = "cesiumStatic";

require("dotenv").config({ path: "./.js.env" });

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env", "@babel/preset-react"] },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
        type: "asset/inline",
      },
    ],
  },
  resolve: {
    fallback: { https: false, zlib: false, http: false, url: false },
  },
  entry: "./assets/index.js",
  output: {
    filename: "index-bundle.js",
    path: path.resolve(__dirname, "./static"),
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(cesiumSource, "Workers"),
          to: `${cesiumBaseUrl}/Workers`,
        },
        {
          from: path.join(cesiumSource, "ThirdParty"),
          to: `${cesiumBaseUrl}/ThirdParty`,
        },
        {
          from: path.join(cesiumSource, "Assets"),
          to: `${cesiumBaseUrl}/Assets`,
        },
        {
          from: path.join(cesiumSource, "Widgets"),
          to: `${cesiumBaseUrl}/Widgets`,
        },
      ],
    }),
  ],
};
