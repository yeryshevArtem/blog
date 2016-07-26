var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/index.html',
  filename: 'index.html',
  plugin: 'body'
});

module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}
