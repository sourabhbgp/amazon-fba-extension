const path = require("path");

module.exports = {
  entry: {
    popup: path.join(__dirname, "./src/popup/index.tsx"),
    content: path.join(__dirname, "./src/content/index.ts"),
    background: path.join(__dirname, "./src/background/index.ts"),
  },

  output: {
    path: path.join(__dirname, "./dist/js"),
    filename: "[name].js",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@src": path.resolve(__dirname, "src/"),
    },
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        exclude: /node_modules/,
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
