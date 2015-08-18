var webpack = require("webpack");

module.exports = {
  entry: './index.js',
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
    ]
  },
  output: {
    filename: 'dist/react-experiments.min.js',
    libraryTarget: 'umd',
    library: 'ReactExperiments'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    }
  ]
}
