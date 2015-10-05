var path = require("path");
var webpack = require("webpack");

var config = {
  debug: true,
  devtool: "source-map",
  entry: {
    "index.ios": ["./app/main.js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel"
    }, {
      test: /node_modules\/react-native-drawer\/.*\.js$/,
      loader: "babel",
      query: {
        stage: 2
      }
    }, {
      test: /node_modules\/react-native-icons\/.*\.js$/,
      loader: "babel",
      query: {
        stage: 2
      }
    }, {
      test: /\.json$/,
      loader: "json"
    }]
  },
  plugins: [],
};

// Hot loader
if (process.env.HOT) {
  config.devtool = "eval"; // Speed up incremental builds
  config.entry["index.ios"].unshift(
    "react-native-webpack-server/hot/entry",
    "webpack/hot/only-dev-server",
    "webpack-dev-server/client?http://localhost:8082"
  );
  config.output.publicPath = "http://localhost:8082/";
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
  config.module.loaders[0].query = {
    plugins: ["react-transform"],
    extra: {
      "react-transform": {
        transforms: [{
          transform: "react-transform-hmr",
          imports: ["react-native"],
          locals: ["module"]
        }]
      }
    }
  };
}

// Production config
if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;
