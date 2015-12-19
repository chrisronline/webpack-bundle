'use strict';

var webpack = require('webpack');
var ExposePlugin = require('./expose.plugin');

module.exports = {
  entry: {
    app: __dirname + '/src/index.js',
    // vendor: ['react']
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?presets[]=es2015'
      }
    ]
  },
  plugins: [
    new ExposePlugin({ globalKey: '__kickoffLibrary' }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filename: 'vendor.js'
    // })
  ]
};